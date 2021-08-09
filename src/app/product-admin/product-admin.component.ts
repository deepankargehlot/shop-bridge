import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubscriptionLike } from 'rxjs';
import { product } from '../shared/interfaces/product';
import { ProductsService } from '../shared/services/products.service';
import { CreateEditProductComponent } from '../shared/components/create-edit-product/create-edit-product.component'
import { BsModalRef, BsModalService, ModalOptions} from 'ngx-bootstrap/modal';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-admin',
  templateUrl: './product-admin.component.html',
  styleUrls: ['./product-admin.component.scss']
})
export class ProductAdminComponent implements OnInit , OnDestroy {

  products:product[] = [];

  originalProductList:product[] = [];

  subscriptions:SubscriptionLike[] = [];

  search:string = '';

  modalRef!: BsModalRef;

  faEdit = faEdit;

  faTrash = faTrash;

  constructor(private productService:ProductsService, private modalService:BsModalService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.subscriptions.push(this.productService.getAllProducts().subscribe(products => {
      this.originalProductList = products;
      this.products = products;

    }));
  }

  searchTable(event:any) {
    if(this.search && this.search === '') {
      this.products =  [...this.originalProductList];
    }
    this.products = this.originalProductList.filter((product) => {
      return Object.values(product).toString().toLowerCase().includes(this.search.toLowerCase())
    })
    
  }

  createProduct() {
    const modalData: Partial<any> = {
      edit:false
    }
    this.modalRef = this.modalService.show(CreateEditProductComponent, {initialState:modalData , class:'modal-dialog-centered modal-md'});
    this.modalRef.content.action.subscribe((action:string) => {
      if(action === 'create') {
        this.modalRef.hide();
       this.getProducts();
      }
      
    })
  }


  ngOnDestroy() {
    this.subscriptions.forEach( productsubscription => {
      productsubscription.unsubscribe();
    })
  }

  edit(i:number) {
     this.modalRef = this.modalService.show(CreateEditProductComponent,{initialState:{product:this.products[i], edit:true},class:'modal-dialog-centered modal-md'});
     this.modalRef.content.action.subscribe((action:string) => {
      if(action === 'edit') {
        this.modalRef.hide();
       this.getProducts();
      }
      
    })
  }

  delete(i:number) {
    let id = this.products[i].id; 
    if(id) {
      this.productService.deleteProduct(id).subscribe(i => {
        this.getProducts();
      })
    }
      
  }
}
