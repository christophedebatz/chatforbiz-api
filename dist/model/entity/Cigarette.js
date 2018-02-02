"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const Coords_1 = require("./Coords");
let Cigarette = class Cigarette {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Cigarette.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => User_1.default, user => user.cigarettes),
    __metadata("design:type", User_1.default)
], Cigarette.prototype, "user", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Cigarette.prototype, "sentiment", void 0);
__decorate([
    typeorm_1.Column(type => Coords_1.default),
    __metadata("design:type", Coords_1.default)
], Cigarette.prototype, "coords", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ name: "creation_date" }),
    __metadata("design:type", Date)
], Cigarette.prototype, "creationDate", void 0);
Cigarette = __decorate([
    typeorm_1.Entity()
], Cigarette);
exports.default = Cigarette;
var Sentiment;
(function (Sentiment) {
    Sentiment["HAPPY"] = "happy";
    Sentiment["DRUNK"] = "drunk";
    Sentiment["NERVOUS"] = "nervous";
    Sentiment["SICK"] = "sick";
    Sentiment["NOT_HAPPY"] = "not-happy";
    Sentiment["CHILLING"] = "chilling";
})(Sentiment = exports.Sentiment || (exports.Sentiment = {}));
;
