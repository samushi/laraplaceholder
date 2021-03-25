import { inject } from "@vue/composition-api";
import { Plugin } from '@nuxt/types'
import { render } from "sass";

export interface PlaceholderInterface {
    fileBag: File[];
    traverseDirectory<T = any>(entry: any) : Promise<T>
    readDropped(entries: any) : void
    uploadFiles(files: FileList) : void
}

class PlaceholderInstance implements PlaceholderInterface{

    private fileListDirectory: any[] = [];
    public fileBag: File[] = [];
    
    /**
     * Traversy directory
     * @param this 
     * @param entry 
     */
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

    /**
     * When dropped files read directory or file
     * @param this 
     * @param entries 
     */
    public readDropped(this: PlaceholderInstance, entries: any): void{
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

    /**
     * Upload files
     * @param this 
     * @param files 
     */
    public uploadFiles(this: PlaceholderInstance, files: FileList) : void {
        this.appendImages(files);
    }

    /**
     * Append Images to the bag
     * @param this 
     * @param files 
     */
    private appendImages(this: PlaceholderInstance, files: FileList) : void {
      Array.from(files).forEach((file) => {
          if(
              file.type === "image/jpeg" ||
              file.type === "image/jpg" ||
              file.type === "image/gif" ||
              file.type === "image/png"
          ){
              this.fileBag.push(file);
          }
      });
    }

    /**
     * Get files from directory
     * @param this 
     * @param results 
     */
    private getEntry(this: PlaceholderInstance, results: any[]){
        results.map((r)=> {
            if(Array.isArray(r)){
                this.getEntry(r);
            }else{
                this.fileListDirectory.push(this.getFile(r));
            }
        })
    }

    /**
     * Get File
     * @param this 
     * @param fileEntry 
     */
    private async getFile(this: PlaceholderInstance, fileEntry: any) : Promise<any>{
        return await new Promise((resolve, reject) => fileEntry.file(resolve, reject));
    }

}

const Placeholder: Plugin = (context : any, inject : any) => {
  inject('placeholder', new PlaceholderInstance())
}

export default Placeholder
