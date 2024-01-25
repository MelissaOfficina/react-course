module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  reportUnusedDisableDirectives: true,
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:eslint-comments/recommended',
    'plugin:import/typescript',
    'plugin:import/typescript',
    'plugin:promise/recommended',
    'plugin:sonarjs/recommended',
    'plugin:unicorn/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  plugins: [
    'deprecation',
    'functional',
    'unicorn',
    'switch-case',
    'sonarjs',
    '@typescript-eslint',
    'etc',
  ],
  rules: {
    // Его покрывает @typescript-eslint/naming-convention
    camelcase: 'off',
    curly: ['error', 'all'],
    'arrow-body-style': ['error', 'as-needed'],

    // Пока выключено, потому что мы можем использовать
    // короткий синтаксис стрелочной функции для краткости
    'no-promise-executor-return': 'off',

    // Запрещает пустые блоки,
    // но разрешает пустой блок в `catch`
    'no-empty': ['error', { allowEmptyCatch: true }],

    // Отступ между кейсами в `switch`
    'switch-case/newline-between-switch-case': [
      'error',
      'always',
      { fallthrough: 'never' },
    ],

    // У комментариев ESLint должно быть описание
    'eslint-comments/require-description': [
      'error',
      { ignore: ['eslint-enable'] },
    ],

    // Сообщает где не нужно использовать `eslint-disable`
    'eslint-comments/no-unused-disable': 'error',

    // Нужно указывать включение после выключения (для всего файла не нужно указывать открытие)
    'eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],

    // Закомментированный код нужно удалять
    'etc/no-commented-out-code': 'error',

    // Оповещение об устаревшем коде
    'deprecation/deprecation': 'warn',

    // Не используем mutable переменные
    'functional/no-let': 'error',

    // Выключаем мутации у объектов и массивов
    'functional/immutable-data': [
      'error',
      {
        ignoreImmediateMutation: true,
        ignoreAccessorPattern: [
          'module.exports',
          'exports.**',
          'window.**',
          'document.**',
          'draft.**',
          '*.defaultProps',
          '*.current',
        ],
      },
    ],

    // Задаем настройки расширений файлов для импорта
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    // Скажем нет ненужному импорту с '*/index'
    'import/no-useless-path-segments': ['error', { noUselessIndex: true }],

    // Сортировка импортов
    'import/order': [
      'error',
      {
        groups: [
          ['builtin', 'external', 'internal'],
          'unknown',
          'parent',
          ['sibling', 'index'],
        ],
        'newlines-between': 'always',
      },
    ],

    // У нас бывает так, что в файле сначала экспортируется один метод,
    // потом появляются еще методы для экспорта, поэтому отключаем
    'import/prefer-default-export': 'off',

    // При использовании `@ts-<directive>` нужно добавлять описание
    '@typescript-eslint/ban-ts-comment': [
      'error',
      {
        'ts-expect-error': 'allow-with-description',
        'ts-ignore': 'allow-with-description',
        // При указании комментария директива перестает работать с TS 3.9.3
        'ts-nocheck': true,
        'ts-check': false,
        minimumDescriptionLength: 5,
      },
    ],

    // Соглашение об именовании
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'default',
        format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
        leadingUnderscore: 'forbid',
        trailingUnderscore: 'allow',
        filter: {
          // Свойства `_id` и `__v` требуются для работы с backend
          // `__html` это React
          regex: '(^_id|^__v|^__html|^_|__+)$',
          match: false,
        },
      },
      ...['enum', 'enumMember'].map((selector) => ({
        selector,
        format: ['PascalCase'],
        leadingUnderscore: 'forbid',
        trailingUnderscore: 'forbid',
      })),
      ...['interface', 'typeAlias'].map((selector) => ({
        selector,
        format: ['PascalCase'],
        prefix: ['I'],
        leadingUnderscore: 'forbid',
        trailingUnderscore: 'forbid',
      })),
      {
        selector: 'typeParameter',
        format: ['PascalCase'],
        prefix: ['T'],
        leadingUnderscore: 'forbid',
        trailingUnderscore: 'forbid',
      },
    ],

    // Неиспользуемые переменные считаются ошибкой
    '@typescript-eslint/no-unused-vars': 'error',

    // Обязательно указывать возвращаемый тип при экспорте функции
    '@typescript-eslint/explicit-module-boundary-types': 'error',

    // Предпочтительнее использование optional chaining
    '@typescript-eslint/prefer-optional-chain': 'error',

    // Не даст соединить объект со строкой
    '@typescript-eslint/no-base-to-string': 'error',

    // Запрещаем числовые литералы, которые теряют точность
    'no-loss-of-precision': 'off',
    '@typescript-eslint/no-loss-of-precision': 'error',

    // Нужно всегда указывать функцию сортировки (compare) у метода `sort`
    '@typescript-eslint/require-array-sort-compare': 'error',

    // Запрет использования переменных до их определения
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],

    // Запрет объявления переменных из теневых переменных, объявленных во внешней области
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],

    // Используется новый JSX Transform
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',

    // Обнаружение отсутствующего `key` свойства, когда необходимо его указание
    'react/jsx-key': [
      'error',
      { checkFragmentShorthand: true, checkKeyMustBeforeSpread: true },
    ],

    // Запрет контекстам React принимать нестабильные значения
    'react/jsx-no-constructed-context-values': 'error',

    // Предотвращение использования небезопасных `target="_blank"`
    'react/jsx-no-target-blank': 'error',

    // Обеспечение соблюдения соглашений об именах обработчиков событий в JSX
    'react/jsx-handler-names': [
      'error',
      {
        checkLocalVariables: true,
        checkInlineFunction: false,
      },
    ],

    // Расширение файла, где используется JSX, должно быть только jsx или tsx
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],

    /**
     * Запрещаем JSX props spreading.
     * TypeScript пока не умеет правильно определять такие пропсы.
     *
     * @example
     * const prop = 'test';
     * // Со `spread` ошибка о несуществующем `prop` не отображается
     * <img src="https://example.com/1.jpg" alt="example" {...{ prop }} />;
     * // Без `spread` ошибка отображается, потому что `prop` не существует для `img`
     * <img src="https://example.com/1.jpg" alt="example" prop={prop} />
     */
    'react/jsx-props-no-spreading': [
      'error',
      {
        html: 'enforce',
        custom: 'enforce',
        explicitSpread: 'enforce',
        exceptions: [],
      },
    ],

    // Отключаем Prop Types
    // Для этого есть Typescript
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'react/no-unused-prop-types': 'off',

    // У хуков с зависимостями необходимо указывать все зависимости.
    // Если нужны не все зависимости по какой-то особой логике,
    // нужно будет выключить правило для определенной строки и описать почему
    'react-hooks/exhaustive-deps': [
      'warn',
      { additionalHooks: '(useUpdateEffect)' },
    ],

    // У нас вызывается dispatch (redux),
    // который не требует использования catch
    'promise/catch-or-return': 'off',

    // Оповещаем о когнитивной сложности функций
    'sonarjs/cognitive-complexity': ['warn', 30],

    // Длина (length) у нас навряд ли будет отрицательная
    // Возможно, здесь лучше поможет TypeScript
    'unicorn/explicit-length-check': 'off',

    /**
     * Отказ от `null` хорошая практика,
     * но к сожалению в нашем проекте он используется
     */
    'unicorn/no-null': 'off',

    // Этим займется TypeScript
    'unicorn/no-array-callback-reference': 'off',

    /**
     * Используется декларативный стиль.
     * В нашем случае `Array.reduce` нужен,
     * но если код выходит слишком сложным и нечитабельным,
     * то его нужно будет разбить на мелкие части/методы (map, filter и т.п.)
     */
    'unicorn/no-array-reduce': 'off',
    'unicorn/no-array-for-each': 'off',

    // Выключено, т.к. для сборки объекта во всех случаях
    // правило предпочитает использовать `Object.fromEntries`.
    // Но это правило не всегда полезно и нужно, т.к. есть проблемы с типами TS,
    // читабельностью и оптимизацией кода (`reduce` сочетает в себе несколько методов)
    'unicorn/prefer-object-from-entries': 'off',

    // Непринципиальная оптимизация,
    // т.к. Set и Array используются по разному
    'unicorn/prefer-set-has': 'off',

    // Запрещаем некоторые сокращения и аббревиатуры
    'unicorn/prevent-abbreviations': [
      'error',
      {
        extendDefaultReplacements: true,
        replacements: {
          props: {
            properties: false,
          },
          params: {
            parameters: false,
          },
          ref: {
            reference: false,
          },
        },
      },
    ],

    // Предпочтительно использовать статические свойства `Number`
    // вместо глобальных
    'unicorn/prefer-number-properties': [
      'error',
      {
        // Используем обычные `Infinity`
        checkInfinity: false,
      },
    ],

    // Я предпочитаю стрелочные функции,
    // а правило рекомендует именованные
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    //чтобы не ругался на атрибут css
    'react/no-unknown-property': ['error', { ignore: ['css'] }],
  },

  overrides: [
    {
      files: '*.js',
      rules: {
        // Это правило не нужно в обычных Node.js скриптах
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
    // Остальные, требующие типы для нормальной работы
    {
      files: '*.{ts,tsx}',
      rules: {
        'dot-notation': 'off',
        '@typescript-eslint/dot-notation': 'error',

        // Запрещает использование `any`,
        // предлагает заменить на `unknown` (если тип неизвестен)
        '@typescript-eslint/no-explicit-any': [
          'error',
          {
            fixToUnknown: true,
          },
        ],

        // Предпочтительнее использование generic type у reduce
        '@typescript-eslint/prefer-reduce-type-parameter': 'error',

        // Предпочтительнее использование nullish coalescing
        '@typescript-eslint/prefer-nullish-coalescing': 'error',

        // Предпочтительно T[] вместо Array<T>
        '@typescript-eslint/array-type': 'error',

        // Для безопасности типов лучше не использовать утверждения
        '@typescript-eslint/consistent-type-assertions': [
          'error',
          {
            assertionStyle: 'never',
          },
        ],

        // Для указания типов объекта используем интерфейс
        '@typescript-eslint/consistent-type-definitions': [
          'error',
          'interface',
        ],

        // Используем `PropertySignature` вместо `MethodSignature`
        '@typescript-eslint/method-signature-style': 'error',

        // Использовать тип `void` только в положенных местах
        '@typescript-eslint/no-invalid-void-type': 'error',

        'no-throw-literal': 'off',
        '@typescript-eslint/no-throw-literal': 'error',
        '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
        '@typescript-eslint/no-unnecessary-condition': 'error',
        '@typescript-eslint/no-unnecessary-qualifier': 'error',
        '@typescript-eslint/no-unnecessary-type-arguments': 'error',
        'unicorn/prefer-includes': 'off',
        '@typescript-eslint/prefer-includes': 'error',

        'unicorn/prefer-string-starts-ends-with': 'off',
        '@typescript-eslint/prefer-string-starts-ends-with': 'error',

        // Запрещает ненулевые утверждения, используя `!` постфиксный оператор.
        // Лучше использовать `optional chaining` совместно с `nullish coalescing`
        '@typescript-eslint/no-non-null-assertion': 'error',
        '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'error',

        // При необходимости использовать безопасный способ игнорирования ошибки
        '@typescript-eslint/prefer-ts-expect-error': 'error',

        // Запрещает использование небулевых типов в выражениях,
        // где ожидается логическое. Ваще жёстко
        '@typescript-eslint/strict-boolean-expressions': 'warn',

        // Предупреждает о любых двух перегрузках,
        // которые могут быть объединены в одну
        // с помощью union или optional/rest параметра
        '@typescript-eslint/unified-signatures': 'warn',

        // Для предотвращения непредвиденных результатов в коде,
        // непредвиденного поведения во время выполнения (runtime),
        // требуя использования литеральных значений в качестве членов enum
        '@typescript-eslint/prefer-literal-enum-member': 'error',

        // Запрещает использование неявного `any` типа в `catch`
        // Выключено, потому что в TS >= 4.4 уже считается `unknown`
        // с включенным `useUnknownInCatchVariables` или `strict`
        '@typescript-eslint/no-implicit-any-catch': 'off',
        // для `catch` в `Promise`
        'etc/no-implicit-any-catch': 'error',

        // Запрещает ненужные ограничения для универсальных типов (generics)
        '@typescript-eslint/no-unnecessary-type-constraint': 'error',

        // Запрещает использование `const enum`,
        // т.к. в Babel это не поддерживается
        'etc/no-const-enum': 'error',

        // Нужно полностью указывать название типа generics,
        // например, `TValue`, `TData` и т.п.
        'etc/no-t': ['error', { prefix: 'T' }],

        // В JSDoc тип указывать не нужно, т.к. указывается в TypeScript
        'jsdoc/require-param-type': 'off',
        'jsdoc/require-returns-type': 'off',
      },
    },
  ],
};
