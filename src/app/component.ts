import { ApplicationRef, Component } from '@angular/core';
import { Model } from './repository.model';
import { Product } from "./product.model";
import { NgForm } from "@angular/forms";
import { ProductFormGroup, ProductFormControl } from "./form.model";

@Component({
    selector: 'app',
    templateUrl: 'template.html'
})
export class ProductComponent {
    model: Model = new Model();
    selectedProduct: Product;
    newProduct: Product = new Product();
    formSubmitted: boolean = false;
    formGroup: ProductFormGroup = new ProductFormGroup();

    // Chapter 14
    
    get jsonProduct() {
        return JSON.stringify(this.newProduct);
    }

    addProduct(p: Product) {
        // console.log("New Product: " + this.jsonProduct);
        this.model.saveProduct(p);
    }

    /*submitForm() {
        Object.keys(this.formGroup.controls)
            .forEach(c => this.newProduct[c] = this.formGroup.controls[c].value);
        this.formSubmitted = true;
        if (this.formGroup.valid) {
            this.addProduct(this.newProduct);
            this.newProduct = new Product();
            this.formGroup.reset();
            this.formSubmitted = false;
        }
    }*/

    submitForm() {
        this.addProduct(this.newProduct);
    }

    getProduct(key: number): Product {
        return this.model.getProduct(key);
    }
    
    getProducts(): Product[] {
        return this.model.getProducts();
    }

    getSelected(product: Product): boolean {
        return product.name == this.selectedProduct;
    }

    // Chapter 13 
    constructor(ref: ApplicationRef) {
        (<any>window).appRef = ref;
        (<any>window).model = this.model;
    }
     
    getKey(index: number, product: Product) {
        return product.id;
    }
 
    getProductCount(): number {
        //console.log("getProductCount invoked"); // Adding a Debugging Statement
        return this.getProducts().length;
    }
    
    targetName: string = "Kayak";

    counter: number = 1;

    get nextProduct(): Product {
        return this.model.getProducts().shift();
    }

    getProductPrice(index: number): number {
        return Math.floor(this.getProduct(index).price);
    }



    getProductByPosition(position: number): Product {
        return this.model.getProducts()[position];
    }
        
    getClassesByPosition(position: number): string {
        let product = this.getProductByPosition(position);
        return "p-2 " + (product.price < 50 ? "bg-info" : "bg-warning");
    }

    getClasses1(): string {
        return this.model.getProducts().length == 5 ? "bg-success" : "bg-warning";
    }

    getClasses(key: number): string {
        let product = this.model.getProduct(key);
        return "p-2 " + (product.price < 50 ? "bg-info" : "bg-warning");
    }

    getClassMap(key: number): Object {
        let product = this.model.getProduct(key);
        return {
            "text-center bg-danger": product.name == "Kayak",
            "bg-info": product.price < 50
        };
    }

    fontSizeWithUnits: string = "30px";
    fontSizeWithoutUnits: string= "30";

    getStyles(key: number) {
        let product = this.model.getProduct(key);
        return {
            fontSize: "30px",
            "margin.px": 100,
            color: product.price > 50 ? "red" : "green"
        };
    }

}
