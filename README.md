# Steinberg Leiva — Estructura del sitio web

## Carpetas

```
steinberg-leiva/
├── index.html          ← Página principal (único archivo a editar)
├── css/
│   └── styles.css      ← Estilos (no modificar salvo ajustes de marca)
├── js/
│   └── script.js       ← Scripts de interacción
├── fuentes/
│   └── montserrat.css  ← Configuración tipográfica (CDN o autohospedada)
└── imagenes/           ← REEMPLAZA ESTAS IMÁGENES con las tuyas
    ├── logo.svg            Logotipo principal (fondo claro)
    ├── logo-claro.svg      Logotipo versión clara para footer oscuro
    ├── hero.jpg            Foto principal del hero (1200×900px mínimo)
    ├── proyecto-1.jpg      Proyecto grande del portfolio (900×420px)
    ├── proyecto-2.jpg      Portfolio celda 2 (500×420px)
    ├── proyecto-3.jpg      Portfolio celda 3 (500×260px)
    ├── proyecto-4.jpg      Portfolio celda 4 (500×260px)
    ├── equipo-1.jpg        Foto socio 1 (600×450px recomendado)
    └── equipo-2.jpg        Foto socio 2 (600×450px recomendado)
```

## Cómo usar

1. **Reemplaza las imágenes** en la carpeta `imagenes/` con los archivos reales.
   Mantén los mismos nombres de archivo para no tener que editar el HTML.

2. **Edita el contenido** en `index.html`:
   - Nombres de los socios
   - Textos de proyectos
   - Email, teléfono y dirección en la sección Contacto
   - Links de LinkedIn
   - Año en el footer

3. **Fuente tipográfica**: Por defecto se carga desde Google Fonts (requiere internet).
   Para uso sin internet, sigue las instrucciones en `fuentes/montserrat.css`.

## Imágenes recomendadas

| Imagen         | Tamaño mínimo | Formato     |
|----------------|---------------|-------------|
| logo.svg       | —             | SVG         |
| hero.jpg       | 1400×1000px   | JPG/WebP    |
| proyecto-1.jpg | 900×420px     | JPG/WebP    |
| proyecto-2/3/4 | 500×300px     | JPG/WebP    |
| equipo-1/2     | 600×450px     | JPG/WebP    |

> Tip: Comprime las imágenes con [Squoosh](https://squoosh.app) antes de subir.
