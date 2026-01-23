This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

```
mobilezone-frontend
├─ app
│  ├─ (admin)
│  │  └─ admin
│  │     ├─ (protected)
│  │     ├─ banner
│  │     │  ├─ add
│  │     │  │  └─ page.js
│  │     │  ├─ page.js
│  │     │  └─ [id]
│  │     │     └─ edit
│  │     │        └─ page.js
│  │     ├─ brand
│  │     │  ├─ add
│  │     │  │  └─ page.js
│  │     │  ├─ page.js
│  │     │  └─ [id]
│  │     │     ├─ edit
│  │     │     │  └─ page.js
│  │     │     └─ show
│  │     │        └─ page.js
│  │     ├─ category
│  │     │  ├─ add
│  │     │  │  └─ page.js
│  │     │  ├─ page.js
│  │     │  └─ [id]
│  │     │     ├─ edit
│  │     │     │  └─ page.js
│  │     │     └─ show
│  │     │        └─ page.js
│  │     ├─ contact
│  │     │  ├─ page.js
│  │     │  └─ [id]
│  │     │     └─ reply
│  │     │        └─ page.js
│  │     ├─ dashboard
│  │     │  └─ DashboardContent.js
│  │     ├─ layout.js
│  │     ├─ login
│  │     │  └─ page.js
│  │     ├─ menu
│  │     │  ├─ add
│  │     │  │  └─ page.js
│  │     │  ├─ page.js
│  │     │  └─ [id]
│  │     │     └─ edit
│  │     │        └─ page.js
│  │     ├─ order
│  │     │  ├─ page.js
│  │     │  └─ [id]
│  │     │     └─ show
│  │     │        └─ page.js
│  │     ├─ page.js
│  │     ├─ post
│  │     │  ├─ add
│  │     │  │  └─ page.js
│  │     │  ├─ page.js
│  │     │  └─ [id]
│  │     │     └─ edit
│  │     │        └─ page.js
│  │     ├─ product
│  │     │  ├─ add
│  │     │  │  └─ page.js
│  │     │  ├─ page.js
│  │     │  └─ [id]
│  │     │     ├─ edit
│  │     │     │  └─ page.js
│  │     │     └─ show
│  │     │        └─ page.js
│  │     ├─ product-sale
│  │     │  ├─ page.js
│  │     │  └─ [id]
│  │     │     └─ edit
│  │     │        └─ page.js
│  │     ├─ product-store
│  │     │  ├─ add
│  │     │  │  └─ page.js
│  │     │  ├─ page.js
│  │     │  └─ [id]
│  │     │     └─ edit
│  │     │        └─ page.js
│  │     ├─ setting
│  │     │  ├─ page.js
│  │     │  └─ [id]
│  │     │     └─ edit
│  │     │        └─ page.js
│  │     ├─ topic
│  │     │  ├─ add
│  │     │  │  └─ page.js
│  │     │  ├─ page.js
│  │     │  └─ [id]
│  │     │     └─ edit
│  │     │        └─ page.js
│  │     ├─ user
│  │     │  ├─ add
│  │     │  │  └─ page.js
│  │     │  ├─ page.js
│  │     │  └─ [id]
│  │     │     └─ edit
│  │     │        └─ page.js
│  │     ├─ _component
│  │     │  ├─ AdminGuard.js
│  │     │  ├─ DashboardOrderChart.js
│  │     │  ├─ Header.js
│  │     │  ├─ Menu.js
│  │     │  └─ ProductSelector.js
│  │     └─ _hooks
│  │        └─ useSummernote.js
│  ├─ (main)
│  │  ├─ (authen)
│  │  │  ├─ login
│  │  │  │  └─ page.js
│  │  │  ├─ profile
│  │  │  │  └─ page.js
│  │  │  └─ register
│  │  │     └─ page.js
│  │  ├─ cart
│  │  │  └─ page.js
│  │  ├─ checkout
│  │  │  └─ page.js
│  │  ├─ contact
│  │  │  └─ page.js
│  │  ├─ layout.js
│  │  ├─ order
│  │  │  └─ page.js
│  │  ├─ page.js
│  │  ├─ post
│  │  │  ├─ page.js
│  │  │  └─ [id]
│  │  │     └─ page.js
│  │  ├─ product
│  │  │  ├─ page.js
│  │  │  └─ [id]
│  │  │     └─ page.js
│  │  ├─ products
│  │  │  └─ [categoryId]
│  │  │     └─ page.js
│  │  ├─ sales
│  │  │  └─ page.js
│  │  ├─ search
│  │  │  └─ page.js
│  │  └─ _components
│  │     ├─ CategorySection.js
│  │     ├─ Footer.js
│  │     ├─ Header.js
│  │     ├─ HtmlContent.js
│  │     ├─ Navbar.js
│  │     ├─ Pagination.js
│  │     ├─ PostCard.js
│  │     ├─ PostContent.js
│  │     ├─ PostNew.js
│  │     ├─ PostTopicMenu.js
│  │     ├─ ProductNew.js
│  │     └─ ProductSale.js
│  ├─ favicon.ico
│  ├─ globals.css
│  ├─ layout.js
│  ├─ structure.txt
│  └─ utils
│     ├─ adminAxios.js
│     ├─ axiosClient.js
│     └─ notify.js
├─ eslint.config.mjs
├─ jsconfig.json
├─ next.config.mjs
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ public
│  ├─ assets
│  │  ├─ css
│  │  │  ├─ bootstrap.css
│  │  │  ├─ style-responsive.css
│  │  │  ├─ style.css
│  │  │  ├─ table-responsive.css
│  │  │  ├─ to-do.css
│  │  │  └─ zabuto_calendar.css
│  │  ├─ font-awesome
│  │  │  ├─ css
│  │  │  │  └─ font-awesome.css
│  │  │  └─ fonts
│  │  │     ├─ fontawesome-webfont.eot
│  │  │     ├─ fontawesome-webfont.svg
│  │  │     ├─ fontawesome-webfont.ttf
│  │  │     ├─ fontawesome-webfont.woff
│  │  │     └─ FontAwesome.otf
│  │  ├─ fonts
│  │  │  ├─ glyphicons-halflings-regular.eot
│  │  │  ├─ glyphicons-halflings-regular.svg
│  │  │  ├─ glyphicons-halflings-regular.ttf
│  │  │  └─ glyphicons-halflings-regular.woff
│  │  ├─ img
│  │  │  ├─ blog-bg.jpg
│  │  │  ├─ checkbox-gray.png
│  │  │  ├─ friends
│  │  │  │  ├─ fr-01.jpg
│  │  │  │  ├─ fr-02.jpg
│  │  │  │  ├─ fr-03.jpg
│  │  │  │  ├─ fr-04.jpg
│  │  │  │  ├─ fr-05.jpg
│  │  │  │  └─ fr-06.jpg
│  │  │  ├─ instagram.jpg
│  │  │  ├─ login-bg.jpg
│  │  │  ├─ lorde.jpg
│  │  │  ├─ mask.png
│  │  │  ├─ ny.jpg
│  │  │  ├─ product.jpg
│  │  │  ├─ product.png
│  │  │  ├─ profile-01.jpg
│  │  │  ├─ profile-02.jpg
│  │  │  ├─ radio-gray.png
│  │  │  ├─ ui-danro.jpg
│  │  │  ├─ ui-divya.jpg
│  │  │  ├─ ui-sam.jpg
│  │  │  ├─ ui-sherman.jpg
│  │  │  ├─ ui-zac.jpg
│  │  │  ├─ weather.jpg
│  │  │  └─ zoom.png
│  │  ├─ js
│  │  │  ├─ bootstrap-inputmask
│  │  │  │  └─ bootstrap-inputmask.min.js
│  │  │  ├─ bootstrap-switch.js
│  │  │  ├─ bootstrap.min.js
│  │  │  ├─ calendar-conf-events.js
│  │  │  ├─ chart-master
│  │  │  │  └─ Chart.js
│  │  │  ├─ chartjs-conf.js
│  │  │  ├─ common-scripts.js
│  │  │  ├─ easy-pie-chart.js
│  │  │  ├─ fancybox
│  │  │  │  ├─ jquery.fancybox.css
│  │  │  │  └─ jquery.fancybox.js
│  │  │  ├─ form-component.js
│  │  │  ├─ fullcalendar
│  │  │  │  ├─ bootstrap-fullcalendar.css
│  │  │  │  └─ fullcalendar.min.js
│  │  │  ├─ gritter
│  │  │  │  ├─ css
│  │  │  │  │  ├─ jquery.gritter.css
│  │  │  │  │  └─ jquery.gritter0.css
│  │  │  │  ├─ images
│  │  │  │  │  ├─ gritter-light.png
│  │  │  │  │  ├─ gritter-long.png
│  │  │  │  │  ├─ gritter.png
│  │  │  │  │  └─ ie-spacer.gif
│  │  │  │  └─ js
│  │  │  │     └─ jquery.gritter.js
│  │  │  ├─ gritter-conf.js
│  │  │  ├─ jquery-1.8.3.min.js
│  │  │  ├─ jquery-easy-pie-chart
│  │  │  │  ├─ jquery.easy-pie-chart.css
│  │  │  │  └─ jquery.easy-pie-chart.js
│  │  │  ├─ jquery-ui-1.9.2.custom.min.js
│  │  │  ├─ jquery.backstretch.min.js
│  │  │  ├─ jquery.dcjqaccordion.2.7.js
│  │  │  ├─ jquery.js
│  │  │  ├─ jquery.nicescroll.js
│  │  │  ├─ jquery.scrollTo.min.js
│  │  │  ├─ jquery.sparkline.js
│  │  │  ├─ jquery.tagsinput.js
│  │  │  ├─ jquery.ui.touch-punch.min.js
│  │  │  ├─ morris-conf.js
│  │  │  ├─ sparkline-chart.js
│  │  │  ├─ tasks.js
│  │  │  └─ zabuto_calendar.js
│  │  └─ lineicons
│  │     ├─ fonts
│  │     │  ├─ linecons.eot
│  │     │  ├─ linecons.svg
│  │     │  ├─ linecons.ttf
│  │     │  └─ linecons.woff
│  │     ├─ index.html
│  │     ├─ lte-ie7.js
│  │     └─ style.css
│  ├─ css
│  │  ├─ bootstrap-rtl.css
│  │  ├─ bootstrap.css
│  │  ├─ bootstrap.css.map
│  │  ├─ responsive.css
│  │  ├─ responsive.css.map
│  │  ├─ ui.css
│  │  └─ ui.css.map
│  ├─ file.svg
│  ├─ fonts
│  │  ├─ fontawesome
│  │  │  ├─ css
│  │  │  │  ├─ all.css
│  │  │  │  ├─ all.min.css
│  │  │  │  ├─ brands.css
│  │  │  │  ├─ brands.min.css
│  │  │  │  ├─ fontawesome.css
│  │  │  │  ├─ fontawesome.min.css
│  │  │  │  ├─ regular.css
│  │  │  │  ├─ regular.min.css
│  │  │  │  ├─ solid.css
│  │  │  │  ├─ solid.min.css
│  │  │  │  ├─ svg-with-js.css
│  │  │  │  ├─ svg-with-js.min.css
│  │  │  │  ├─ v4-shims.css
│  │  │  │  └─ v4-shims.min.css
│  │  │  └─ webfonts
│  │  │     ├─ fa-brands-400.eot
│  │  │     ├─ fa-brands-400.svg
│  │  │     ├─ fa-brands-400.ttf
│  │  │     ├─ fa-brands-400.woff
│  │  │     ├─ fa-brands-400.woff2
│  │  │     ├─ fa-regular-400.eot
│  │  │     ├─ fa-regular-400.svg
│  │  │     ├─ fa-regular-400.ttf
│  │  │     ├─ fa-regular-400.woff
│  │  │     ├─ fa-regular-400.woff2
│  │  │     ├─ fa-solid-900.eot
│  │  │     ├─ fa-solid-900.svg
│  │  │     ├─ fa-solid-900.ttf
│  │  │     ├─ fa-solid-900.woff
│  │  │     └─ fa-solid-900.woff2
│  │  └─ roboto
│  │     ├─ font.css
│  │     ├─ Roboto-Bold.ttf
│  │     ├─ Roboto-Light.ttf
│  │     ├─ Roboto-Medium.ttf
│  │     ├─ Roboto-Regular.ttf
│  │     └─ Roboto-Thin.ttf
│  ├─ globe.svg
│  ├─ images
│  │  ├─ 1.png
│  │  ├─ avatars
│  │  │  ├─ avatar1.jpg
│  │  │  ├─ avatar2.jpg
│  │  │  └─ avatar3.jpg
│  │  ├─ banners
│  │  │  ├─ ad-sm.png
│  │  │  ├─ ad.png
│  │  │  ├─ banner-item1.jpg
│  │  │  ├─ banner-item2.jpg
│  │  │  ├─ banner-item3.jpg
│  │  │  ├─ banner1.jpg
│  │  │  ├─ banner2.jpg
│  │  │  ├─ banner3.jpg
│  │  │  ├─ banner4.jpg
│  │  │  ├─ banner5.jpg
│  │  │  ├─ banner6.jpg
│  │  │  ├─ banner7.jpg
│  │  │  ├─ banner8.jpg
│  │  │  ├─ banner9.jpg
│  │  │  ├─ slide-lg-1.jpg
│  │  │  ├─ slide-lg-2.jpg
│  │  │  ├─ slide-lg-3.jpg
│  │  │  ├─ slide1.jpg
│  │  │  ├─ slide2.jpg
│  │  │  └─ slide3.jpg
│  │  ├─ favicon.ico
│  │  ├─ icons
│  │  │  ├─ flags
│  │  │  │  ├─ AU.png
│  │  │  │  ├─ AU@2x.png
│  │  │  │  ├─ CN.png
│  │  │  │  ├─ CN@2x.png
│  │  │  │  ├─ DE.png
│  │  │  │  ├─ DE@2x.png
│  │  │  │  ├─ GB.png
│  │  │  │  ├─ GB@2x.png
│  │  │  │  ├─ IN.png
│  │  │  │  ├─ IN@2x.png
│  │  │  │  ├─ RU.png
│  │  │  │  ├─ RU@2x.png
│  │  │  │  ├─ TR.png
│  │  │  │  ├─ TR@2x.png
│  │  │  │  ├─ US.png
│  │  │  │  ├─ US@2x.png
│  │  │  │  ├─ UZ.png
│  │  │  │  └─ UZ@2x.png
│  │  │  ├─ pay-american-ex.png
│  │  │  ├─ pay-bank.png
│  │  │  ├─ pay-mastercard.png
│  │  │  ├─ pay-visa-el.png
│  │  │  ├─ pay-visa.png
│  │  │  ├─ stars-active.svg
│  │  │  └─ starts-disable.svg
│  │  ├─ items
│  │  │  ├─ 1.jpg
│  │  │  ├─ 10.jpg
│  │  │  ├─ 11.jpg
│  │  │  ├─ 12.jpg
│  │  │  ├─ 13.jpg
│  │  │  ├─ 14.jpg
│  │  │  ├─ 15-1.jpg
│  │  │  ├─ 15-2.jpg
│  │  │  ├─ 15.jpg
│  │  │  ├─ 2.jpg
│  │  │  ├─ 3.jpg
│  │  │  ├─ 4.jpg
│  │  │  ├─ 5.jpg
│  │  │  ├─ 6.jpg
│  │  │  ├─ 7.jpg
│  │  │  ├─ 8.jpg
│  │  │  ├─ 9.jpg
│  │  │  ├─ airpods-4-2.webp
│  │  │  ├─ apple-watch.jpg
│  │  │  ├─ Avt_Collection_3_anh_3a850171e6.jpg
│  │  │  ├─ iphone-16-pro.webp
│  │  │  ├─ laptop.jpg
│  │  │  ├─ transparent-1911160__340.webp
│  │  │  └─ xiaomi-pad-7_5__1.webp
│  │  ├─ logo-white.png
│  │  ├─ logo.png
│  │  ├─ logo.svg
│  │  ├─ misc
│  │  │  ├─ appstore.png
│  │  │  ├─ payments.png
│  │  │  └─ playmarket.png
│  │  └─ posts
│  │     ├─ 1.jpg
│  │     ├─ 2.jpg
│  │     ├─ 3.jpg
│  │     └─ 4.jpg
│  ├─ js
│  │  ├─ bootstrap.bundle.min.js
│  │  ├─ jquery-2.0.0.min.js
│  │  └─ script.js
│  ├─ next.svg
│  ├─ sass
│  │  ├─ bootstrap-assets
│  │  │  ├─ mixins
│  │  │  │  ├─ _alert.scss
│  │  │  │  ├─ _background-variant.scss
│  │  │  │  ├─ _badge.scss
│  │  │  │  ├─ _border-radius.scss
│  │  │  │  ├─ _box-shadow.scss
│  │  │  │  ├─ _breakpoints.scss
│  │  │  │  ├─ _buttons.scss
│  │  │  │  ├─ _caret.scss
│  │  │  │  ├─ _clearfix.scss
│  │  │  │  ├─ _deprecate.scss
│  │  │  │  ├─ _float.scss
│  │  │  │  ├─ _forms.scss
│  │  │  │  ├─ _gradients.scss
│  │  │  │  ├─ _grid-framework.scss
│  │  │  │  ├─ _grid.scss
│  │  │  │  ├─ _hover.scss
│  │  │  │  ├─ _image.scss
│  │  │  │  ├─ _list-group.scss
│  │  │  │  ├─ _lists.scss
│  │  │  │  ├─ _nav-divider.scss
│  │  │  │  ├─ _pagination.scss
│  │  │  │  ├─ _reset-text.scss
│  │  │  │  ├─ _resize.scss
│  │  │  │  ├─ _screen-reader.scss
│  │  │  │  ├─ _size.scss
│  │  │  │  ├─ _table-row.scss
│  │  │  │  ├─ _text-emphasis.scss
│  │  │  │  ├─ _text-hide.scss
│  │  │  │  ├─ _text-truncate.scss
│  │  │  │  ├─ _transition.scss
│  │  │  │  └─ _visibility.scss
│  │  │  ├─ utilities
│  │  │  │  ├─ _align.scss
│  │  │  │  ├─ _background.scss
│  │  │  │  ├─ _borders.scss
│  │  │  │  ├─ _clearfix.scss
│  │  │  │  ├─ _display.scss
│  │  │  │  ├─ _embed.scss
│  │  │  │  ├─ _flex.scss
│  │  │  │  ├─ _float.scss
│  │  │  │  ├─ _overflow.scss
│  │  │  │  ├─ _position.scss
│  │  │  │  ├─ _screenreaders.scss
│  │  │  │  ├─ _shadows.scss
│  │  │  │  ├─ _sizing.scss
│  │  │  │  ├─ _spacing.scss
│  │  │  │  ├─ _stretched-link.scss
│  │  │  │  ├─ _text.scss
│  │  │  │  └─ _visibility.scss
│  │  │  ├─ vendor
│  │  │  │  └─ _rfs.scss
│  │  │  ├─ _alert.scss
│  │  │  ├─ _badge.scss
│  │  │  ├─ _bootstrap.scss
│  │  │  ├─ _breadcrumb.scss
│  │  │  ├─ _button-group.scss
│  │  │  ├─ _buttons.scss
│  │  │  ├─ _card.scss
│  │  │  ├─ _carousel.scss
│  │  │  ├─ _close.scss
│  │  │  ├─ _code.scss
│  │  │  ├─ _custom-forms.scss
│  │  │  ├─ _dropdown.scss
│  │  │  ├─ _forms.scss
│  │  │  ├─ _functions.scss
│  │  │  ├─ _grid.scss
│  │  │  ├─ _images.scss
│  │  │  ├─ _input-group.scss
│  │  │  ├─ _jumbotron.scss
│  │  │  ├─ _list-group.scss
│  │  │  ├─ _media.scss
│  │  │  ├─ _mixins.scss
│  │  │  ├─ _modal.scss
│  │  │  ├─ _nav.scss
│  │  │  ├─ _navbar.scss
│  │  │  ├─ _pagination.scss
│  │  │  ├─ _popover.scss
│  │  │  ├─ _print.scss
│  │  │  ├─ _progress.scss
│  │  │  ├─ _reboot.scss
│  │  │  ├─ _root.scss
│  │  │  ├─ _spinners.scss
│  │  │  ├─ _tables.scss
│  │  │  ├─ _toasts.scss
│  │  │  ├─ _tooltip.scss
│  │  │  ├─ _transitions.scss
│  │  │  ├─ _type.scss
│  │  │  ├─ _utilities.scss
│  │  │  └─ _variables.scss
│  │  ├─ bootstrap.scss
│  │  ├─ responsive.scss
│  │  ├─ ui-assets
│  │  │  ├─ components
│  │  │  │  ├─ _buttons.scss
│  │  │  │  ├─ _cards-item.scss
│  │  │  │  ├─ _elements.scss
│  │  │  │  ├─ _forms.scss
│  │  │  │  ├─ _items.scss
│  │  │  │  ├─ _lists.scss
│  │  │  │  ├─ _menu.scss
│  │  │  │  └─ _plugin-styles.scss
│  │  │  ├─ helpers
│  │  │  │  ├─ _bg.scss
│  │  │  │  ├─ _helper-classes.scss
│  │  │  │  ├─ _mixins.scss
│  │  │  │  └─ _typography.scss
│  │  │  ├─ pages
│  │  │  │  ├─ _page-account.scss
│  │  │  │  ├─ _page-base.scss
│  │  │  │  ├─ _page-detail.scss
│  │  │  │  ├─ _page-home.scss
│  │  │  │  ├─ _page-listing.scss
│  │  │  │  └─ _page-order.scss
│  │  │  ├─ sections
│  │  │  │  ├─ _footer.scss
│  │  │  │  ├─ _header.scss
│  │  │  │  └─ _sidebar.scss
│  │  │  └─ _rtl-override.scss
│  │  ├─ ui.scss
│  │  └─ _variables-custom.scss
│  ├─ vercel.svg
│  └─ window.svg
└─ README.md

```