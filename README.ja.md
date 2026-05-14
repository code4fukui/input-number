# input-number

標準的なHTML入力にありがちな制限を解決し、サニタイズされた数値のみのテキスト入力を提供するWebコンポーネントです。

## デモ
https://code4fukui.github.io/input-number/

## なぜ `input-number` なのか？

`<input type="number">` や `<input pattern="[0-9]*">` のような標準のHTML入力には欠点があります。非数値の入力ができてしまったり、`maxlength` 属性が無視されたり、バリデーション時のユーザー体験が良くないことがよくあります。このコンポーネントは、リアルタイムで1文字ずつバリデーションとサニタイズを行うことで、これらの問題を解決します。

## 機能
- **厳密な数値入力:** `0-9` の数字のみ入力可能です。
- **自動サニタイズ:** 全角数字（０-９）を標準の半角数字に自動変換します。ペーストされたテキストからは非数値の文字を取り除きます。
- **リアルタイムバリデーション:** フォームの送信を待つことなく、無効な文字の入力をその場で防ぎます。
- **視覚的なフィードバック:** 必須フィールドが空の場合にハイライト表示し、無効な文字が入力されようとした際には一時的なツールチップを表示します。
- **複数行サポート:** `rows` 属性が指定されている場合、複数行の `<textarea>` としてレンダリングされます。
- **モバイル対応:** `inputmode="numeric"` を設定し、モバイルデバイスでテンキー（数値キーパッド）を表示させます。
- **標準属性のサポート:** `maxlength`、`placeholder`、`required`、`value` などの一般的な入力属性をサポートします。

## 使い方

### 1. コンポーネントのインポート
HTMLにスクリプトタグを追加してコンポーネントを読み込みます。
```html
<script type="module" src="https://code4fukui.github.io/input-number/input-number.js"></script>
```

### 2. HTMLでの使用
標準的な属性を使用して `<input-number>` タグを記述します。

```html
<!-- 最大文字数を指定したシンプルな数値入力 -->
<input-number id="zip-code" maxlength="7"></input-number>

<!-- 必須の複数行入力 -->
<input-number id="id-list" rows="4" maxlength="200" placeholder="数値IDを1行ずつ入力..." required></input-number>
```

### 3. 値の取得
`onchange` イベントをリッスンするか、`.value` プロパティにアクセスして、クリーンな数値文字列を取得します。

```html
<script type="module">
  const zipCodeInput = document.getElementById('zip-code');
  zipCodeInput.onchange = () => {
    console.log(zipCodeInput.value); // 例: "1234567"
  };
</script>
```

## 属性
- `value`: 入力フィールドの初期値。
- `maxlength`: 入力可能な最大文字数。
- `placeholder`: 入力が空のときに表示されるプレースホルダーテキスト。
- `rows`: 1より大きい値を設定すると、コンポーネントは複数行の `<textarea>` としてレンダリングされます。
- `required`: 入力を必須にする論理属性。空の必須入力フィールドは視覚的にハイライトされます。

## プログラムからの使用
JavaScriptを使用して `InputNumber` インスタンスを作成し、設定することもできます。
```javascript
import { InputNumber } from "https://code4fukui.github.io/input-number/input-number.js";

const parentElement = document.getElementById("my-container");

// 複数行の必須入力を作成
const multiLineInput = new InputNumber({ rows: 8, required: "required" });
parentElement.appendChild(multiLineInput);

// 初期値を持つ1行の入力を作成
const singleLineInput = new InputNumber({ value: "12345" });
parentElement.appendChild(singleLineInput);
```
