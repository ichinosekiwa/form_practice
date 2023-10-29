'use strict';

document.getElementById('contact').addEventListener('submit', function (event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const tel = document.getElementById('tel').value;
  const age = document.getElementById('age').value;
  const message = document.getElementById('message').value;
  const result = document.getElementById('result');

  const telPattern = /^[0-9\-]+$/;
  const agePattern = /^[0-9]+$/;

  const errors = [];

  if (name.length > 50) {
    errors.push('50文字以内で入力してください。');
  }

  if (!telPattern.test(tel)) {
    errors.push('半角数字とハイフンのみ使用できます。');
  }

  if (!agePattern.test(age) || isNaN(Number(age))) {
    errors.push('半角数字のみ使用できます。');
  }

  if (message.length > 200) {
    errors.push('200文字以内で入力してください。');
  }

  // バリデーションOKなら入力内容表示
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
  // バリデーションNGならエラー表示
  else {
    errors.forEach((error) => {
      result.innerHTML += `<p>${error}</p>`;
    });
  }
});
