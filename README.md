# Frontend Zentro - E-commerce Platform

## Descripción
Frontend Zentro es una plataforma de comercio electrónico moderna construida con Next.js, TypeScript y Tailwind CSS. La aplicación ofrece una experiencia de compra intuitiva y atractiva con funcionalidades completas de e-commerce.

## Características Principales
- 🛍️ Catálogo de productos con filtrado y búsqueda
- 🛒 Sistema de carrito de compras
- 👤 Autenticación de usuarios
- 📱 Diseño responsive
- 🎯 Sección de ofertas y novedades
- 👨‍💼 Panel de administración
- 🔍 Búsqueda avanzada de productos
- 📦 Gestión de categorías

## Tecnologías Utilizadas
- Next.js 14
- TypeScript
- Tailwind CSS
- React Context API
- Custom Hooks
- ESLint
- PostCSS

## Estructura del Proyecto
```
src/
├── app/              # Rutas y páginas principales
├── components/       # Componentes reutilizables
├── context/         # Contextos de React
├── hooks/           # Custom hooks
├── lib/             # Utilidades y configuraciones
├── services/        # Servicios y llamadas API
├── store/           # Estado global
├── styles/          # Estilos globales
└── types/           # Definiciones de TypeScript
```

## Requisitos Previos
- Node.js 18.x o superior
- npm o yarn

## Instalación
1. Clonar el repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
```

2. Instalar dependencias:
```bash
npm install
# o
yarn install
```

3. Iniciar el servidor de desarrollo:
```bash
npm run dev
# o
yarn dev
```

## Despliegue
El proyecto está configurado para ser desplegado en Vercel. Para desplegar:

1. Crear una cuenta en Vercel
2. Conectar el repositorio de GitHub
3. Configurar las variables de entorno necesarias
4. Desplegar

## Variables de Entorno
Crear un archivo `.env.local` con las siguientes variables:
```
NEXT_PUBLIC_API_URL=tu_url_api
```

## Scripts Disponibles
- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run start` - Inicia la aplicación en modo producción
- `npm run lint` - Ejecuta el linter

## Contribución
1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## Licencia
Este proyecto está bajo la Licencia MIT.

## Contacto
[Tu Nombre] - [Tu Email]

## Agradecimientos
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vercel](https://vercel.com/)
