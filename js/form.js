'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact');
  if (contactForm) {
    const errorText = 'error';
    const telItem = document.querySelectorAll('.tel');
    const ageItem = document.querySelectorAll('.age');
    const maxlengthItem = document.querySelectorAll('.maxlength');

    // エラーメッセージspan要素を作って表示する
    const createError = (item, errorMessage) => {
      // span 作成
      const errorSpan = document.createElement('span');
      errorSpan.classList.add(errorText);
      errorSpan.textContent = errorMessage;
      item.parentNode.appendChild(errorSpan);
    };
    //送信したらエラーを表示する全ての要素を削除（初期化）
    contactForm.addEventListener('submit', (e) => {
      // リロードを防ぐ？
      e.preventDefault();
      const errorItems = contactForm.querySelectorAll('.' + errorText);
      errorItems.forEach((item) => {
        item.remove();
      });
      // バリデーションが成功したかどうか (constはダメ)
      let validate = true;

      // 電話番号についての検証
      telItem.forEach((item) => {
        const pattern = /^[0-9\-]+$/;
        if (item.value !== '') {
          // test() メソッドで値を判定 NGならメッセージを表示してフォームの送信を中止する
          if (!pattern.test(item.value)) {
            createError(item, '半角数字とハイフンのみ使用できます');
            validate = false;
          }
        }
      });

      // 年齢についての検証
      ageItem.forEach((item) => {
        const pattern = /^[0-9]+$/;
        if (item.value !== '') {
          if (!pattern.test(item.value)) {
            createError(item, '半角数字のみ使用できます');
            validate = false;
          }
        }
      });

      // maxlengthについての検証
      maxlengthItem.forEach((item) => {
        // data-maxlength属性から文字数を取得
        const maxlength = item.getAttribute('data-maxlength');
        if (item.value !== '') {
          if (item.value.length > maxlength) {
            createError(item, maxlength + '文字以内で入力してください');
            validate = false;
          }
        }
      });

      if (validate) {
        const nameInput = document.querySelector('.name');
        const telInput = document.querySelector('.tel');
        const ageInput = document.querySelector('.age');
        const messageInput = document.querySelector('.message');

        const name = nameInput.value;
        const tel = telInput.value;
        const age = ageInput.value;
        const message = messageInput.value;

        // 入力内容を画面に出力
        document.getElementById('result').textContent = `
          名前: ${name}
          電話番号: ${tel}
          年齢: ${age}
          お問い合わせ内容: ${message}
        `;
      } else {
        e.preventDefault();
      }
    });
  }
});
