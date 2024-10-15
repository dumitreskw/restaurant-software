import { Component, EventEmitter, Output } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { FileUploadService } from '../../../services/file-upload.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {
  files: NgxFileDropEntry[] = [];
  @Output() fileUploadedEvent = new EventEmitter<string>();

  constructor(private uploadService: FileUploadService) {
    
  }
  dropped(files:NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          // Here you can access the real file
          //console.log(file)
          //console.log(droppedFile.relativePath, file);

          // You could upload it like this:          
          let formData = new FormData();
          formData.append('image', file);
          this.uploadService.upload(formData).subscribe(res => this.fileUploadedEvent.emit(res.image_url));
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event: any){
    console.log(event);
  }

  public fileLeave(event: any){
    console.log(event);
  }
}
