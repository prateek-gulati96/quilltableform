import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { createBlogService } from 'src/service/createBlog-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'createpost';
  message;
  thumb:any; 
  categorySet:any = ['--select category--','Application','Visa','Pre Arrival','Post Arrival','Job Search']
  subCategorySet:any = ['--select subCategory--','GRE/GMAT','Application','I20','Flight Information','Packing List', 'First 2 weeks', 'Bank Account', 'LinkedIn']
  
  verify: boolean = false;
  imgURL: string | ArrayBuffer;
  imagePath: any;
  constructor( private formBuilder: FormBuilder , private service: createBlogService)
  {}
  blogDetailsForm = this.formBuilder.group({

    blogTopic: new FormControl('', [Validators.required, Validators.minLength(3)]),
    category: new FormControl('', [Validators.required]),
    subcategory: new FormControl('', [Validators.required]),
    body: new FormControl('', Validators.required),
    videoURL: new FormControl(''),
    blogImage: new FormControl('')


});

  set2(uri) {
    this.verify = true
    var thumb = this.getParameterByName(uri.value, 'v'),
        url = 'http://img.youtube.com/vi/' + thumb + '/default.jpg';
      this.thumb = url
  }
  getParameterByName(url, name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(url);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }
  
  preview(files) {
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }


  onSubmit(blogRequest : NgForm){
    console.log(blogRequest)
    const formData = new FormData();
    formData.append("blogTopic",this.blogDetailsForm.controls.blogTopic.value);
    formData.append("category",this.blogDetailsForm.controls.category.value);
    formData.append("subcategory",this.blogDetailsForm.controls.subcategory.value);
    formData.append("body",this.blogDetailsForm.controls.body.value);
    formData.append("videoURL",this.blogDetailsForm.controls.videoURL.value);
    formData.append('blogImage', this.blogDetailsForm.get('blogImage').value);

    try {
      this.service.createPostService(formData)
    } catch (error) {
      alert("Some error occured") 
    }
    this.blogDetailsForm.reset()
  }
}
