export class UsersProps {
    users: User[];
}

export class User {
    id:         number;
    firstName:  string;
    lastName:   string;
    maidenName: string;
    age:        number;
    gender:     Gender;
    email:      string;
    phone:      string;
    username:   string;
    password:   string;
    birthDate:  string;
    image:      string;
    bloodGroup: string;
    height:     number;
    weight:     number;
    eyeColor:   string;
    hair:       Hair;
    ip:         string;
    address:    Address;
    macAddress: string;
    university: string;
    bank:       Bank;
    company:    Company;
    ein:        string;
    ssn:        string;
    userAgent:  string;
    crypto:     Crypto;
    role:       Role;
}

export class Address {
    address:     string;
    city:        string;
    state:       string;
    stateCode:   string;
    postalCode:  string;
    coordinates: Coordinates;
    country:     Country;
}

export class Coordinates {
    lat: number;
    lng: number;
}

export enum Country {
    UnitedStates = "United States",
}

export class Bank {
    cardExpire: string;
    cardNumber: string;
    cardType:   string;
    currency:   string;
    iban:       string;
}

export class Company {
    department: string;
    name:       string;
    title:      string;
    address:    Address;
}

export class Crypto {
    coin:    Coin;
    wallet:  Wallet;
    network: Network;
}

export enum Coin {
    Bitcoin = "Bitcoin",
}

export enum Network {
    EthereumERC20 = "Ethereum (ERC20)",
}

export enum Wallet {
    The0Xb9Fc2Fe63B2A6C003F1C324C3Bfa53259162181A = "0xb9fc2fe63b2a6c003f1c324c3bfa53259162181a",
}

export enum Gender {
    Female = "female",
    Male = "male",
}

export class Hair {
    color: string;
    type:  Type;
}

export enum Type {
    Curly = "Curly",
    Kinky = "Kinky",
    Straight = "Straight",
    Wavy = "Wavy",
}

export enum Role {
    Admin = "admin",
    Moderator = "moderator",
    User = "user",
}