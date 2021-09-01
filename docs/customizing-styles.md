# Customizing Styles

## Makeshop

出力される HTML は `item-description-generated-by-cake` というクラス名のついた `div` 要素で囲まれます。直下セレクタなどを使用することで、この拡張機能によって出力された HTML にのみ CSS を適用することができます。

### Example

以下の箇所に貼り付けてください。

- 独自デザイン(PC) > 共通 head 管理 > ページ設定: 商品詳細
- 独自デザイン(スマホ) > (適用済みのテンプレート) 編集 > 共通 head 管理 > ページ設定: 商品詳細

```html
<!-- Cheesecake用 CSS -->
<style>
  .item-description-generated-by-cake > h3:not(:first-child) {
    margin-top: 48px;
  }
  .item-description-generated-by-cake > p:not(:first-child),
  .item-description-generated-by-cake > img:not(:first-child),
  .item-description-generated-by-cake > table:not(:first-child) {
    margin-top: 16px;
  }

  .item-description-generated-by-cake > h3 {
    font-weight: bold;
    font-size: 1.3em;
    font-weight: normal;
    border-bottom: 1px dashed #ccc;
  }
  .item-description-generated-by-cake > table {
    width: 100%;
    border-spacing: 0;
    border-collapse: collapse;
  }
  .item-description-generated-by-cake > table > tbody > tr > th,
  .item-description-generated-by-cake > table > tbody > tr > td {
    font-size: 13px;
    vertical-align: top;
    height: auto;
    padding: 10px;
    border: 1px solid #ccc;
  }
  .item-description-generated-by-cake > table > tbody > tr > th {
    font-weight: bold;
    background-color: #efefef;
    width: 22%;
  }
</style>
<!-- Cheesecake用 CSS -->
```
