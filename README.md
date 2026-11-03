# es-site

Каталог оборудования ES (es.vodoplav.ru). MkDocs Material, Pages via Actions.

- `text/` — исходники (markdown)
- `text/img/<МОДЕЛЬ>/` — фото и видео
- Пуш в `master` -> GitHub Actions -> https://plavdom.github.io/es-site/
- Переключение на es.vodoplav.ru: направить A-записи на 185.199.108.153..111 и AAAA на 2606:50c0:8000..8003 (или CNAME на plavdom.github.io), затем вернуть файл `CNAME` (es.vodoplav.ru) в корень и включить Custom Domain в Settings -> Pages.
