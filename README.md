# 27 Vet — sitio web

Prototipo funcional de la web de **27 Vet** (veterinaria + petshop): tienda online, sistema de
turnos y panel de vendedores. Hecho con **React + Vite**, **Tailwind CSS v4** y **Framer Motion**
para las animaciones.

## Cómo correrlo

```bash
npm install
npm run dev
```

Abrí la URL que muestra la terminal (por defecto `http://localhost:5173`).

Para generar la versión de producción:

```bash
npm run build
npm run preview   # sirve la carpeta dist/ para probarla
```

## Qué incluye este prototipo

- **Home** animada, con hero (parallax + contador animado), servicios, productos destacados,
  testimonios, horarios/ubicación y llamado a la acción.
- **Tienda** (`/tienda`) con categorías (alimento, ropa, accesorios, higiene, juguetes, salud),
  filtros por mascota/categoría/búsqueda, ficha de producto, stock en tiempo real (badges de
  "sin stock" / "últimas unidades") y carrito lateral.
- **Checkout** (`/tienda/checkout`) con datos del cliente, retiro en local o envío a domicilio,
  botón de pago (simulado — ver sección Mercado Pago más abajo) y aviso del pedido por WhatsApp.
  El stock de los productos comprados se descuenta automáticamente.
- **Turnos** (`/turnos`) con un asistente de 3 pasos: servicio → fecha/hora → datos de la mascota
  y del dueño, respetando los horarios reales de atención. Al confirmar, el cliente recibe un
  código de turno, puede confirmarlo por WhatsApp y agregarlo a Google Calendar.
- **Gestionar turno** (`/turnos/gestionar`) para que el cliente busque su turno (código + email)
  y lo cancele o reprograme sin depender del panel.
- **Botón flotante de WhatsApp** en todo el sitio público, con estado "disponible ahora" según
  el horario real de atención y opciones rápidas predefinidas (turno, pedido, productos, urgencia).
- **Fotos reales** de mascotas y atención veterinaria en el hero, la sección "Nosotros", las
  categorías de la tienda y los servicios (ver `src/data/images.js`).
- **Panel de vendedores** (`/panel/ingresar`) protegido por login, con tres secciones:
  - **Turnos**: lista o vista calendario semanal, con todos los detalles y cambio de estado.
  - **Pedidos**: detalle completo de cada compra, con cambio de estado.
  - **Productos**: gestión de stock y precio por producto, y mostrar/ocultar de la tienda.
  - Usuario demo: `admin@27vet.com` / contraseña `27vet2026`

## Datos y "backend"

Este prototipo **no tiene backend real todavía**: los turnos y pedidos se guardan en el
navegador (localStorage) a través de `zustand`, para que el panel de vendedores funcione de
punta a punta sin necesitar un servidor. El código ya está organizado para que conectar un
backend real sea un cambio acotado:

- `src/store/adminDataStore.js` — turnos y pedidos (reemplazar por llamadas a Supabase).
- `src/store/productsStore.js` — catálogo, stock y precios (reemplazar por una tabla real).
- `src/store/authStore.js` — login del panel (reemplazar por Supabase Auth).
- `src/store/cartStore.js` — carrito de compras.
- `src/data/products.js`, `src/data/services.js` y `src/data/business.js` — catálogo, servicios
  y datos de contacto/WhatsApp (reemplazar por los reales).
- `src/lib/hours.js` — horarios de atención y generación de turnos disponibles.

### Próximos pasos sugeridos

1. **Supabase**: tablas `products`, `orders`, `order_items`, `appointments`, y autenticación
   para el panel de vendedores (con roles).
2. **Mercado Pago**: integrar Checkout Pro (o la API de Mercado Pago) en `src/pages/Checkout.jsx`,
   reemplazando el `setTimeout` simulado por la creación real de una preferencia de pago.
3. **WhatsApp real**: hoy los mensajes son links `wa.me` que abren WhatsApp manualmente. Para
   recordatorios automáticos de turnos hace falta backend + WhatsApp Business API (o Twilio).
4. **Notificaciones por mail**: al confirmar un turno o pedido, enviar mail de confirmación
   (por ejemplo con un Edge Function de Supabase).
5. **Contenido real**: reemplazar el número de WhatsApp (`src/data/business.js`), productos,
   textos y ubicación del mapa por los datos reales de la veterinaria.
6. **Fotos propias**: `src/data/images.js` centraliza todas las fotos del sitio (son fotos de
   stock gratuitas de Unsplash, elegidas para que se vea profesional desde ya). Cuando la
   veterinaria tenga sus propias fotos (local, equipo, pacientes), alcanza con reemplazar cada
   URL de ese archivo — no hay que tocar ningún componente.

## Estructura del proyecto

```
src/
  components/
    admin/      -> tarjetas y elementos del panel de vendedores
    booking/     -> asistente de turnos
    home/        -> secciones de la home
    layout/      -> navbar, footer, layout general
    shop/        -> tarjetas de producto, carrito
    ui/          -> botones, logo, animaciones reutilizables
  data/          -> catálogo de productos, servicios y datos de contacto/WhatsApp (mock)
  lib/           -> horarios, turnos disponibles, links de WhatsApp/Google Calendar, códigos cortos
  pages/         -> una página por ruta
  store/         -> estado global (carrito, panel, productos, auth) con zustand
```

⚠️ Antes de publicar, reemplazá `whatsapp` en `src/data/business.js` por el número real de la
veterinaria (formato solo dígitos con código de país, sin `+` ni espacios) para que los links
de WhatsApp funcionen de verdad.
