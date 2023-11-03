'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.querySelector('.contact');
  if (contactForm) {
    const errorText = 'error';
    const telItem = document.querySelectorAll('.tel');
    const ageItem = document.querySelectorAll('.age');

    // エラーメッセージspan要素を作って表示する
    const createError = (item, errorMessage) => {
      // span 作成
      const errorSpan = document.createElement('span');
      errorSpan.classList.add(errorText);
      // aria-live属性を設定（aria-live属性を "polite" に設定すると、エラーメッセージが新しく追加されたときに、他のコンテンツに干渉を与えずにユーザーに通知される）
      errorSpan.setAttribute('aria-live', 'polite');
      errorSpan.textContent = errorMessage;
      item.parentNode.appendChild(errorSpan);
    };
    //送信したらエラーを表示する全ての要素を削除（初期化）
    contactForm.addEventListener('submit', (e) => {
      const errorItems = contactForm.querySelectorAll('.' + errorText);
      errorItems.forEach((item) => {
        item.remove();
      });

      // 電話番号についての検証
      telItem.forEach((item) => {
        const pattern = /^[0-9\-]+$/;
        if (item.value !== '') {
          //test() メソッドで値を判定 NGならメッセージを表示してフォームの送信を中止する
          if (!pattern.test(item.value)) {
            createError(item, '半角数字とハイフンのみ使用できます。');
            e.preventDefault();
          }
        }
      });
      // 年齢についての検証
      ageItem.forEach((item) => {
        const pattern = /^[0-9]+$/;
        if (item.value !== '') {
          if (!pattern.test(item.value)) {
            createError(item, '半角数字のみ使用できます。');
            e.preventDefault();
          }
        }
      });
    });
  }
  // バリデーションOKなら入力内容表示
  const resultItem = document.getElementById('result');
  if (errors.length === 0) {
    result.innerHTML = `
                        <p>入力内容を確認</p>
                        <p>名前: ${name}</p>
                        <p>電話番号: ${tel}</p>
                        <p>年齢: ${age}</p>
                        <p>問い合わせ内容: ${message}</p>
                    `;
    document.getElementById('contact').reset();
  }
});
