import { HttpClient } from '@angular/common/http';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
   })
   
export class createBlogService{

    constructor(private http:HttpClient){
    }

    createPostService(bgPost){
        console.log("this is the requestbody from service",bgPost)
        let uri = 'http://localhost:3000/app'
        this.http.post(uri,bgPost).subscribe(
            (res) => {
                console.log(res)
            },
            (err) => console.log(err)
          );
        // .toPromise().then(data=> {
        //     console.log(data)
        // });
          
    }
}

interface blogSchema{
    blogTopic :  String,
    category :String,
    subcategory : String,
    blogImage: any,
    body : String,
    videoURL : String
}