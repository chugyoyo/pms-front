build by vue-admin-template : https://github.com/PanJiaChen/vue-admin-template

## env
```
node 8.x，python2
```

## dev

```bash
cd admin-base
npm install
npm run dev
```

This will automatically open http://localhost:9528

## package

```bash
# build for production environment
npm run build:prod
```

## config

```
// http://127.0.0.1:8000/dev-env

//.env.developerment

VUE_APP_BASE_API = '/dev-env'

// .env.production
VUE_APP_BASE_API = '/prod-env'
```

