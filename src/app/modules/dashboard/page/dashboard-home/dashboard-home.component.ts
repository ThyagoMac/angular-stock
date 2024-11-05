import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { GetAllProductsResponse } from 'src/app/models/interfaces/products';
import { ProductsService } from 'src/app/services/products/products.service';
import { ProductsDataTransferService } from 'src/app/shared/services/products/products-data-transfer.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: [],
})
export class DashboardHomeComponent implements OnInit {
  public productList: Array<GetAllProductsResponse> = [];

  constructor(
    private productService: ProductsService,
    private messageService: MessageService,
    private productsDataTransferService: ProductsDataTransferService
  ) {}
  ngOnInit(): void {
    this.getProductsDatas();
  }

  getProductsDatas(): void {
    this.productService.getAllProducts().subscribe({
      next: (response) => {
        if (response && response.length > 0) {
          this.productList = response;
          this.productsDataTransferService.setProductsData(this.productList);
        }
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: "Can't get the producs try again later",
          life: 2500,
        });
      },
    });
  }
}
