# Tienda Virtual - Vue

## Descripción
"Tienda Virtual" es una app web desarrollada con Vue.js y Vuetify que permite a los usuarios buscar y comprar productos en línea. La aplicación incluye funcionalidades como búsqueda de productos por nombre, creación de usuarios y agregar productos al carrito.

## Estructura del Proyecto
- **src/**
  - **components/**: Componentes reutilizables de la aplicación.
  - **views/**: Vistas principales de la aplicación.
  - **store/**: Gestión del estado global de la aplicación utilizando Pinia.
  - **router/**: Configuración de las rutas de la aplicación.
  - **assets/**: Recursos estáticos como imágenes.
  - **App.vue**: Componente raíz de la aplicación.

## Dependencias Principales
- **Vue.js**: Framework progresivo para construir interfaces de usuario.
- **Vuetify**: Biblioteca de componentes UI basada en Material Design.
- **Pinia**: Gestión del estado centralizado para aplicaciones Vue.js.
- **Vue Router**: Enrutador oficial para Vue.js.

## Componente Clave
- **Shop.vue**: Vista principal de la tienda en línea.

## Funcionalidades
- **Búsqueda de Productos**: Permite a los usuarios buscar productos utilizando un campo de texto.
- **Gestión de Usuarios**: Funcionalidad para que los usuarios inicien y cierren sesión.
- **Agregar al Carrito**: Se utiliza un endpoint para agregar productos al carrito.

## Instala las Dependencias

```sh
npm install
```

### Run the app

```sh
npm run dev
```