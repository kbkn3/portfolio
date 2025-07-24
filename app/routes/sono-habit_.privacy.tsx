export function meta() {
  return [
    { title: "プライバシーポリシー | Sono Habit" },
    {
      name: "description",
      content: "Sono Habitのプライバシーポリシー",
    },
    { name: "robots", content: "noindex, nofollow" },
  ]
}

export default function SonoHabitPrivacyPage() {
  return (
    <article className="prose prose-gray max-w-none">
      <h1>プライバシーポリシー</h1>

      <p className="text-sm text-gray-600 mb-8">最終更新日: 2024年7月24日</p>

      <section className="mb-8">
        <h2>1. 本ポリシーについて</h2>
        <p>
          本プライバシーポリシーは、「そのハビット」（以下「本アプリ」）における個人情報の取扱いについて定めたものです。
        </p>
      </section>

      <section className="mb-8">
        <h2>2. 収集する情報</h2>
        <p>本アプリでは、以下の情報を収集する場合があります：</p>
        <ul>
          <li>利用状況に関する統計情報（匿名化されたデータ）</li>
          <li>アプリの動作ログ（エラー情報等）</li>
          <li>デバイス情報（OS バージョン、ブラウザ情報等）</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2>3. 情報の利用目的</h2>
        <p>収集した情報は以下の目的で利用します：</p>
        <ul>
          <li>アプリの機能向上・改善</li>
          <li>不具合の調査・修正</li>
          <li>利用状況の分析</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2>4. 第三者への提供</h2>
        <p>
          本アプリでは、法令に基づく場合を除き、収集した個人情報を第三者に提供することはありません。
        </p>
      </section>

      <section className="mb-8">
        <h2>5. データの保存期間</h2>
        <p>
          収集したデータは、利用目的を達成するために必要な期間のみ保存し、不要になった場合は適切に削除します。
        </p>
      </section>

      <section className="mb-8">
        <h2>6. セキュリティ</h2>
        <p>
          収集した情報については、適切なセキュリティ対策を講じ、不正アクセス、紛失、破壊、改ざん及び漏洩の防止に努めます。
        </p>
      </section>

      <section className="mb-8">
        <h2>7. お問い合わせ</h2>
        <p>
          本プライバシーポリシーに関するお問い合わせは、以下までご連絡ください：
        </p>
        <ul>
          <li>
            Twitter:{" "}
            <a
              href="https://twitter.com/kbkn3"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              @kbkn3
            </a>
          </li>
          <li>
            GitHub:{" "}
            <a
              href="https://github.com/kbkn3"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              kbkn3
            </a>
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2>8. ポリシーの変更</h2>
        <p>
          本プライバシーポリシーは、必要に応じて変更される場合があります。変更された場合は、本ページにて公表いたします。
        </p>
      </section>
    </article>
  )
}
