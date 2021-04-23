import { inject } from "@vue/composition-api";
import { Plugin } from '@nuxt/types'
import { render } from "sass";
import axios, {AxiosResponse, AxiosError, AxiosPromise} from 'axios';
import { AnyNode } from "postcss";

interface onUploadProgressInterface {
    (uploadEvent: any) : void
}

export interface PlaceholderInterface {
    fileBag: File[];
    readDropped(entries: any) : PlaceholderInstance
    uploadFiles(files: FileList) : PlaceholderInstance
    generate(onUploadProgress: onUploadProgressInterface): Promise<any>
}

class PlaceholderInstance implements PlaceholderInterface{
    private baseUrl:string = (process.env.API_URL as string); //"http://backend-placeholder.test/api/"
    private fileListDirectory: any[] = [];
    public fileBag: File[] = [];
    
    /**
     * Traversy directory
     * @param this 
     * @param entry 
     */
    traverseDirectory(this: PlaceholderInstance, entry: any) : Promise<any>
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
              }, (e: any) => {console.log(e, "Cant read directory")});
          }

          readEntries();
      });
    }
    
    /**
     * Generate Images
     * @param onUploadProgress 
     */
    public generate(onUploadProgress: onUploadProgressInterface) : any
    {
        if(this.fileBag.length > 0)
        {
            const fd:FormData = new FormData();
            this.fileBag.forEach((image) => {
                fd.append('files[]', image, image.name);
            });
            return new Promise<any>((resolve, rejecet) => {
                axios.post(this.baseUrl + 'upload', fd, { 
                    onUploadProgress: onUploadProgress
                }).then((r: AxiosResponse) => {
                    resolve(r);
                })
                .catch((e: AxiosError) => {
                    console.warn("We cant upload, something is wrong or not configured well");
                    rejecet(e)
                });
            });
        }else{
            console.log("Please dont upload another type, just images you can upload");
        }
    }

    /**
     * When dropped files read directory or file
     * @param this 
     * @param entries 
     */
    public readDropped(entries: any): PlaceholderInstance{
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

        return this;
    }

    /**
     * Upload files
     * @param this 
     * @param files 
     */
    public uploadFiles(files: FileList) : PlaceholderInstance {
        this.appendImages(files);
        return this;
    }

    /**
     * Append Images to the bag
     * @param this 
     * @param files 
     */
    private appendImages(files: FileList) : void {
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
    private getEntry(results: any[]){
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
    private async getFile(fileEntry: any) : Promise<any>{
        return await new Promise((resolve, reject) => fileEntry.file(resolve, reject));
    }

}

const Placeholder: Plugin = (context : any, inject : any) => {
  inject('placeholder', new PlaceholderInstance())
}

export default Placeholder
