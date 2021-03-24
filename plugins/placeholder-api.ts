import { inject } from "@vue/composition-api";
import { Plugin } from '@nuxt/types'
import { render } from "sass";

interface Placeholder {
    ping() : string,
    traverseDirectory(entry: any) : Promise<any>
}

const $placeholder : Placeholder = {
    ping:  () : string => {
        return "This is ping";
    },

    traverseDirectory(this: Placeholder, entry: any) : Promise<any> {
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
}


const Placeholder: Plugin = (context : any, inject : any) => {
  inject('placeholder', $placeholder)
}

export default Placeholder
