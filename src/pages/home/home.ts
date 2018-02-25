import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [MediaCapture, File, FilePath, AngularFireDatabase]
})
export class HomePage {
  videoObject: any;
  myBlob: any;
  constructor(public navCtrl: NavController,
              private mediaCap: MediaCapture,
              private file: File, private filePath: FilePath,
              private db: AngularFireDatabase) {

  }
  captureVideo(){
      this.mediaCap.captureVideo({limit: 1, duration: 60, quality: 1}).then((data: MediaFile[]) => {;
        let index = data[0].fullPath.lastIndexOf('/'), finalPath = data[0].fullPath.substr(0, index);
        this.file.readAsArrayBuffer(finalPath, data[0].name).then((file) => {
          let blob = new Blob([file], {type: data[0].type});
          this.myBlob = blob;
          this.uploadVideoToStorage();
        });
      });
    }
  uploadVideoToStorage(){
    let storageRef =  firebase.storage().ref();
    let task = storageRef.child('videos/'+ new Date().getTime()+".mp4").put(this.myBlob);
    task.on('state_changed', (snapshot: any) => {
      let uploading = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      console.log("upload is " + uploading + "% done");
      if(uploading == 100){
        alert('uploaded OK');
      }
    });
  }

}
