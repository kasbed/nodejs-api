# nodejs-api

API desarrollada en node y ts para pruebas

## Estructura de datos

Usuario

``` typescript
    name: string
    lastName: string
    password: string
    email: string
    active: boolean
    admin: boolean
    profilePic: string
```

Producto

``` typescript
    name: string
    description: string
    price: number
    active: boolean
    picture: string
```

## Endpoints disponibles

Endpoints públicos

``` typescript
    post /login
    post /register
    get /products
    get /product/:id
```

Endpoints securizados con JWT

``` typescript
    get /profile
    get /private/users
    get /private/user/:id
    post /private/user
    put /private/user
    put /private/user/:id/enable
    put /private/user/:id/disale
    delete /private/user/:id
    
    post /private/product
    put /private/product
    put /private/product/:id/enable
    put /private/product/:id/disale
    delete /private/product/:id
```
