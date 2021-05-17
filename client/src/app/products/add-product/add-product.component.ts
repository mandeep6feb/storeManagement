import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from 'src/app/api.service';
export class Products {
  product_name: any;
  quantity: any;
  details: any;
  category: any;
  price: any;
  image: any;
  manufacturer: any;
  constructor() {
  }
}
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  product: any;
  imageSrc: any;
  file: File;
  update = false;
  prodID: any
  @Output() added = new EventEmitter<boolean>();
  constructor(public api: ApiServiceService, public router: Router,public route: ActivatedRoute) { 
    this.product = new Products();
    this.route.params.subscribe(param => {
      if (param.id) {
        this.getByid(param.id);
        this.update = true;
        this.prodID = param.id;

      }
    });
  }
   getByid(id) {
      this.api.getDataByID('products', id).subscribe( ( res: any) => {
        this.product = res;
        this.imageSrc = this.api.url + 'look/' + res.image;
        console.log(res)
        this.update = true;
      }, error => {
        console.log(error)
      });
  }
  updateProd() {
      if(this.file){this.product.image = this.file.name};
      this.api.patchdata('products/' + this.prodID, this.product).subscribe( ( res: any) => {
        this.added.emit(true);
        this.router.navigateByUrl('/products')
      }, error => {
        console.log(error)
      });
  }
  handleFileInput(files: FileList) {
    this.file = files.item(0);
    const reader = new FileReader();
    reader.onload = e => this.imageSrc = reader.result;
    reader.readAsDataURL(this.file);
    const formData = new FormData();
    formData.append('file', this.file);
    console.log(this.file)
    this.api.postdata('upload',  formData).subscribe((res: any) => {
    console.log(res);
  }, eror => {
    console.log(eror);
  });
  }
  postRegister() {
      this.product.image = this.file.name;
      this.api.postdata('products', this.product).subscribe( ( res: any) => {
        this.product = new Products();
        this.added.emit(true)
        this.imageSrc = '';
        console.log(res)
      }, error => {
        console.log(error)
      });
  }
  
  ngOnInit(): void {
  }

}
