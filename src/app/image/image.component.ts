import { Component, OnInit } from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';
import { EventService } from '../../services/eventService/event.service';
import {saveAs} from 'file-saver';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
  uploader: FileUploader = new FileUploader({url: 'http://localhost:8080/upload'});
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True'})};


  attachmentList: any = [];

  constructor(private eventService: EventService) {
    this.uploader.onCompleteItem = (item: any, response: any , status: any, headers: any) => {
      this.attachmentList.push(JSON.parse(response));
   };
  }

  ngOnInit() {
  }

  download(index) {
    const filename = this.attachmentList[index].uploadname;

    this.eventService.downloadFile(filename)
    .subscribe(
        data => saveAs(data, filename),
        error => console.error(error)
    );
  }
}

