import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { createBlogService } from 'src/service/createBlog-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'createpost';
  thumb:any; 
  categorySet:any = ['--select category--','Application','Visa','Pre Arrival','Post Arrival','Job Search']
  subCategorySet:any = ['--select subCategory--','GRE/GMAT','Application','I20','Flight Information','Packing List', 'First 2 weeks', 'Bank Account', 'LinkedIn']
  constructor( private formBuilder: FormBuilder , private service: createBlogService)
  {}
  blogDetails = this.formBuilder.group({

    blogTopic: new FormControl('', [Validators.required, Validators.minLength(3)]),
    category: new FormControl('', [Validators.required]),
    subcategory: new FormControl('', [Validators.required]),
    body: new FormControl('', Validators.required),
    videoURL: new FormControl(''),
    blogImage: new FormControl('')


});

  set2(uri) {
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

  onSubmit(blogRequest){
    console.log(blogRequest)
    
    this.service.createPostService(blogRequest)
  }
}
