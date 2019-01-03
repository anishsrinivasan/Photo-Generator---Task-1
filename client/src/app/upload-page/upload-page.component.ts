import { Component, OnInit,ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {MatSnackBar} from '@angular/material';
import { HttpClient } from '@angular/common/http';
// Import CropperComponent
import { CropperComponent } from 'angular-cropperjs';
import html2canvas from 'html2canvas';
import { timeout } from 'q';
declare var Caman:any;
import {ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-upload-page',
  templateUrl: './upload-page.component.html',
  styleUrls: ['./upload-page.component.scss']
})
export class UploadPageComponent implements OnInit {
selectedCountry:any;
selectedType:any;
selectedCopies:any;
selectedCopiesArray:any;
orgFile:any;
orgPhoto:any;
photo:any;
params:any;
submittedFlag:any = false;
dimensions:any;
filterFlag = false;
filterVal = 0;
countries = [
  {
    name: 'India', value: 'india', passport: {
      height: 192,
      width: 192,
    }, visa: {
      height: 531,
      width: 413
    }
  },
  { name: 'USA', value: 'usa', passport: {
    height: 192,
    width: 192,
  }, visa: {
    height: 192,
    width: 192
  } },
  { name: 'Turkey', value: 'turkey', passport: {
    height: 226,
    width: 188,
  }, visa: {
    height: 150,
    width: 150
  }  },
]

photoType = [
  {name:'Visa',value:'visa'},
  {name:'Passport',value:'passport'},
]


photoCopies = [
  {name:'4',value:4},
  {name:'8',value:8},
  {name:'16',value:16},
  {name:'24',value:24},
]

// 
isLinear = false;
// Get with @ViewChild
@ViewChild('angularCropper') public angularCropper: CropperComponent;
  constructor(private http:HttpClient,private sanitization:DomSanitizer,public snackBar: MatSnackBar,public route:ActivatedRoute,) { }

  ngOnInit() {
  this.getParams()
  this.initImage()
  }

  getParams(){
    this.route.params.subscribe(data => {
      console.log(data)
      const filename = data.photoId;
      if(filename){
        this.params = filename;
        this.downloadFile(filename)
      }
    })
  }

  downloadFile(filename){
    this.http.post('http://localhost:3000/download',{
      filename:filename
    },{
      responseType : 'blob'}).subscribe(data => {
console.log(data)  
let reader = new FileReader();
reader.onload = (e: any) => {
  this.orgPhoto = e.target.result;
  console.log(this.orgPhoto)
}
reader.readAsDataURL(data);
})

  }

  setPhoto(event){

    this.photo = [];
    let file = event.target.files[0];
    this.orgFile = file;
    if (file) {

        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.orgPhoto = e.target.result;
          console.log(this.orgPhoto)
        }
        reader.readAsDataURL(file);
      
    }

  }
  comp(o1: any, o2: any): boolean {
    console.log('Comparing Both');
    return o1 == o2;
  }

submit(){
  if(this.selectedCountry && this.selectedCopies && this.selectedType && this.photo){

    console.log(this.selectedCountry,this.selectedCopies,this.selectedType)
    this.dimensions = this.selectedCountry[this.selectedType.value]
    this.submittedFlag = true;
    this.selectedCopiesArray = Array(this.selectedCopies).fill(0).map((x,i)=>i);
    console.log(this.selectedCopies)
    console.log(this.dimensions)
  }else{
    this.openSnackBar('Please Fill the Details Properly')
  }


}

goBack(){
  this.submittedFlag = false;
}

printComponent() {
  let printContents = document.getElementById('print').innerHTML;
  let originalContents = document.body.innerHTML;

  document.body.innerHTML = printContents;

  window.print();

  document.body.innerHTML = originalContents;
}


openSnackBar(value) {
  this.snackBar.open(value,'dismiss',{
    duration:2000
  });
}

rotateLeft(){
  this.angularCropper.cropper.rotate(-90)
}

rotateRight(){
  this.angularCropper.cropper.rotate(90)

}
zoomIn(){
  console.log('ZoomIn')
  this.angularCropper.cropper.zoom(0.1)
}
zoomOut(){
  console.log('ZoomOut')
  this.angularCropper.cropper.zoom(-0.1)
}
getImage(){
this.angularCropper.cropper.getCanvasData()
this.angularCropper.cropper.getCroppedCanvas().toBlob((blob) => {
var reader = new FileReader();
reader.readAsDataURL(blob); 
reader.onload = (e: any) => {
  this.photo = e.target.result;
  // this.setCanvas()
  // this.submit()

}

})
}

addFilter(){
  this.getImage()
  this.filterFlag = true;
}


changeFilter(val){
  // this.filterVal = val;
  // console.log(this.filterVal) 

  switch(val){
    case 0: {
      Caman('#image-filter', function () {
        this.revert();
        this.render()
      });
      break;
    }
    case 1: {
      Caman('#image-filter', function () {
        this.revert();
        this.contrast(80);
        this.render();
      });
      break;
    }
    case 2:{
      Caman('#image-filter', function () {
        this.revert();
        this.sepia(60);
        this.render();
      });
      break;
    }

    case 3:{
      Caman('#image-filter', function () {
        this.revert();
        this.greyscale()
        this.render();
      });
      break;
    }
    case 4:{
      Caman('#image-filter', function () {
        this.revert();
        this.invert()
        this.render();
      });
      break;
    }
    case 5:{
      Caman('#image-filter', function () {
        this.revert();
        this.nostalgia()
        this.render();
      });
      break;
    }
    default:{
      console.log('No Filter Found'
      )
    }

  }


  setTimeout(() => {
    let canvas = document.getElementById('image-filter') as HTMLCanvasElement;
    // console.log(canvas)
    this.photo = canvas.toDataURL("image/png");
  },1000)

}

setCanvas(){
  console.log('Setting Canvas')
  html2canvas(document.querySelector("#print")).then(function(canvas) {
    document.body.appendChild(canvas);
});
    
}

uploadImage(){
console.log(this.photo)
  let formData = new FormData();
  // Split the base64 string in data and contentType
var block = this.photo.split(";");
// Get the content type of the image
var contentType = block[0].split(":")[1];// In this case "image/gif"
// get the real base64 content of the file
var realData = block[1].split(",")[1];// In this case "R0lGODlhPQBEAPeoAJosM...."

// Convert it to a blob to upload
var blob = this.b64toBlob(realData, contentType,null);
console.log(blob)
  if(this.params)
  formData.append('file',blob,this.params+'-'+new Date())
  else
  formData.append('file',blob,this.orgFile.filename)

  console.log(formData)
  this.http.post('http://localhost:3000/upload',formData,{responseType: 'text'})
  .subscribe(res => {
    console.log(res)
    if(res == 'Success'){
      this.openSnackBar('Image Uploaded Successfully')
    }
  })
}

b64toBlob(b64Data, contentType, sliceSize) {
  contentType = contentType || '';
  sliceSize = sliceSize || 512;

  var byteCharacters = atob(b64Data);
  var byteArrays = [];

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
  }

var blob = new Blob(byteArrays, {type: contentType});
return blob;
}


initImage(){

}

}
