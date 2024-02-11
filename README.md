# Setup

## React App
Create a react app with typescript template
```bash
npx create-react-app my-react-leaflet-app --template typescript
```

Change `src/index.tsx` getElementById root to something custom
```tsx
...
document.getElementById('my-custom-root') as HTMLElement
...
```

Change `public/index.html` root `<div>` to custom matching id.
```html
...
<div id="my-custom-root"></div>
...
```

Build your site
```bash
npm run build
```

## Storage / Hosting

### Azure Storage Account
Create a storage location
- Azure Storage Account
- Azure storage account static website

Upload your build folder content to your storage account

### Squarespace

Create a Squarespace website ([link](https://www.squarespace.com))

Add a code block of type HTML

```html
<div id="my-custom-root"></div>

<script type="text/javascript">
    (function (g, r, head, script) {
        head = r.getElementsByTagName("head")[0];
        script = r.createElement("script");
        script.async = 1;
        script.src = "<mystorageaccountURL>/static/js/main.189d282d.js";

        head.appendChild(script);

    })(window, document);
</script>
<link href="<mystorageaccountURL>/static/css/main.f855e6bc.css" rel="stylesheet">
```