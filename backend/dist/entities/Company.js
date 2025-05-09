var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Vehicle } from "./Vehicle.js";
import { Driver } from "./Driver.js";
import { Order } from "./Order.js"; // if needed
let Company = class Company {
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Company.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Company.prototype, "name", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Company.prototype, "address", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Company.prototype, "contact", void 0);
__decorate([
    OneToMany(() => Vehicle, (vehicle) => vehicle.company),
    __metadata("design:type", Array)
], Company.prototype, "vehicles", void 0);
__decorate([
    OneToMany(() => Driver, (driver) => driver.company),
    __metadata("design:type", Array)
], Company.prototype, "drivers", void 0);
__decorate([
    OneToMany(() => Order, (order) => order.company),
    __metadata("design:type", Array)
], Company.prototype, "orders", void 0);
Company = __decorate([
    Entity()
], Company);
export { Company };
