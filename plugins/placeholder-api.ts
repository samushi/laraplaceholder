import { inject } from "@vue/composition-api";
import { Plugin } from '@nuxt/types'
import { render } from "sass";

export interface PlaceholderInterface {
    ping() : string,
    traverseDirectory<T = any>(entry: any) : Promise<T>
}

class PlaceholderInstance implements PlaceholderInterface{

    fileListDirectory: any[] = [];

    ping():string{
      return "This is ping";
    }
    
    traverseDirectory(this: PlaceholderInterface, entry: any) : Promise<any>
    {
      const reader: any = entry.createReader();

      return new Promise((resolve, reject) => {
          const iterationAttempts : any[] = [];

          const readEntries = () => {
            
              reader.readEntries((entries: any) => {
                  if(!entries.length){
                      resolve(Promise.all(iterationAttempts));
                  }else{
                    iterationAttempts.push(Promise.all(entries.map((ientry: any)=> {
                      if(ientry.isFile) { 
                          return ientry;
                      }
                      return this.traverseDirectory(ientry);
                    })));

                    readEntries();
                  }
              }, (e: any) => {console.log(e)});
          }

          readEntries();
      });
    }

    readDropped(this: PlaceholderInstance, entries: any): void{
        for (let i = 0; i < entries.length; i += 1) {
            const item = entries[i];
            const entry = item.webkitGetAsEntry();

            this.traverseDirectory(entry).then((results: any[]) => {
                    this.getEntry(results[0]);

                Promise.all(this.fileListDirectory).then((fl: any) => {
                    this.uploadFiles(fl);
                });

            });
        }
    }

    getEntry(this: PlaceholderInstance, results: any[]){
        results.map((r)=> {
            if(Array.isArray(r)){
                this.getEntry(r);
            }else{
                this.fileListDirectory.push(this.getFile(r));
            }
        })
    }

    async getFile(this: PlaceholderInstance, fileEntry: any) : Promise<any>{
        return await new Promise((resolve, reject) => fileEntry.file(resolve, reject));
    }

}

const Placeholder: Plugin = (context : any, inject : any) => {
  inject('placeholder', new PlaceholderInstance())
}

export default Placeholder
