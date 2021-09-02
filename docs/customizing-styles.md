# Customizing Styles

## MakeShop

出力される HTML は `item-description-generated-by-cake` というクラス名のついた `div` 要素で囲まれます。直下セレクタなどを使用することで、この拡張機能によって出力された HTML にのみ CSS を適用することができます。

### Example

以下の箇所に貼り付けてください。 (**:warning: 貼り付け時に他のものを上書きしないように注意してください**)

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
  .item-description-generated-by-cake > img {
    width: 100%;
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

## 楽天

楽天のスマホ用商品説明文では使用できるタグが著しく制限されるため、スタイルの変更はできません。 (出力される HTML には `<b>` や　`<font>` などを用いて直接スタイルを当てています)

PC 用説明文に出力される HTML は (MakeShop と同様に) `item-description-generated-by-cake` というクラス名のついた `div` 要素で囲まれます。ただし、拡張用のスタイルを記述したい場所である「ヘッダー・フッター・レフトナビのテンプレート設定」では直下セレクタ (`>`) が使用できないようです。そのため、以下の例では仕方なく子孫セレクタを使用しています。

### Example

RMS > 店舗設定 > デザイン設定 > PC デザイン設定 の ヘッダー・フッター・レフトナビ > (使用中のテンプレート) 編集 > 「ヘッダーコンテンツ」 に記述

```html
<!-- Cheesecake用 CSS -->
<style>
  .item-description-generated-by-cake {
    font-size: 16px;
  }
  .item-description-generated-by-cake h2:not(:first-child) {
    margin-top: 48px;
  }
  .item-description-generated-by-cake p:not(:first-child),
  .item-description-generated-by-cake img:not(:first-child),
  .item-description-generated-by-cake table:not(:first-child) {
    margin-top: 16px;
  }

  .item-description-generated-by-cake h2 {
    font-size: 1.3em;
    font-weight: normal;
    border-bottom: 1px dashed #ccc;
  }
  .item-description-generated-by-cake p {
    font-size: 1em;
    line-height: 1.5em;
    letter-spacing: 0.08em;
  }
  .item-description-generated-by-cake img {
    width: 100%;
  }
  .item-description-generated-by-cake table {
    width: 100%;
    border-spacing: 0;
    border-collapse: collapse;
  }
  .item-description-generated-by-cake table tbody tr th,
  .item-description-generated-by-cake table tbody tr td {
    font-size: 13px;
    vertical-align: top;
    height: auto;
    padding: 10px;
    border: 1px solid #ccc;
  }
  .item-description-generated-by-cake table tbody tr th {
    font-weight: bold;
    background-color: #efefef;
    width: 22%;
    text-align: left;
  }
</style>
<!-- Cheesecake用 CSS -->
```
