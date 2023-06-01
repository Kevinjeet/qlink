import React from 'react'

const Input = () => {
  return (
    <div className='input'>
      <input type='text' placeholder='Type something...' />
      <div className='send'>
        <img width={20} height={20} src='https://png.pngtree.com/element_our/20190528/ourmid/pngtree-photo-icon-image_1128397.jpg' alt='' />
        <input type='file' style={{ display: "none" }} id='file' />
        <label htmlFor='file'>
          <img width={20} height={20} src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQIAAADDCAMAAABeUu/HAAAAflBMVEX39/cAAAD////7+/ucnJzx8fFycnIzMzNjY2Pr6+v8/PwjIyP19fXFxcXv7+91dXWlpaXj4+Pa2tqNjY02NjbU1NSoqKhNTU3Ozs6FhYV8fHyvr69DQ0NPT0/CwsJoaGgVFRVaWlomJiYdHR09PT2YmJhGRka5ubkRERGJiYkupaAhAAAF2ElEQVR4nO2d6XbqOgyFhQQFXObpAGHsRPv+L3hDaWwncULgngO12fsnJKzoi2TJNssigiAIgiAIgiDoN0hEKf6WErn3w9xeolja80P9a9nvL8eDw7ShYhD3fqrbSZhHg9ZzLaXmUzR8FAqKR+PXmlOTepvDh6Dk8Oa2/6T9PHBPEBU9lwE4arUJ2BOEu81zAI5aj/jej/qPpBrbKgCO+gozS/KmKoBYzRAdgb+ctn4+FwwOUWgMhPZZG1fjw6hxqg7bo2gxyX6/CIuBNDKZcB21mU3Ax8UiDweZa7bqno/8lyWNl5RxS1cdGGMYpcfLfTh+IJ1ULuwXloDCw5Z9ZSsYP5A/llmTaVnlI7zZ2e4SiB/wk2XU17n6V3XsaKgHwYBnlkmbCiZx3bphHkAsyMgyqFrBYxdRnw3/60RlJfxhxVfKc3PPk/ehwO+XE4jv6pq7up67gbSvC2trAHn13A2sbDC4yBReXnnjb5M1Fl5a6ilTUP6bZ7uRuK/taF8Y0jI1buBxYrRGgtnF3mxC4cXjAVHpdNC8/EVKL4SkwHqx/HCFL/M4uXvr7YBoBsPPa2yw3OCvP9qtpPRrrF81oLGeMG18jQTWy0CXpoOTRNeIvk6aTT74c60FOif4ikC/xOviwI6E69zo7lJ63j+90gClZwqepkUzP2hc+QsmpXhaIHKyZNi8OpJ1WvR0U0GSiU5xZfP9VxtVvJzIyVZTy08EnfJXKIo78+h9PK4fpsRuR+fV/80p91UjQfDusE94WP/Q1V9tHzVcRnKyrfDm51igEThyIg9zG+0LBwQ9ojb9zAjFCIQWWQDfw35ukyVYBDwq2FD/k10xDxWBvTyc0S6zyBwogvJ/mwxTtoaJILW7lFd69yhMBJ1dgfE/Wtt5IUgEqW3m5/e4KIoLpLGNxV5oDRGBWLuFtUidsqCwDKyPe+YnQkTApiJstu3XPTR5cmw+DxCBtT/yRimrpGEYmE8DRGDtFPYyRslQf2VW3ANEILu8mYnMNryZGYeHwNQEb655YT4SwkOgouSjmWPya6JklBgcIAK9tzJ0mCS6ct6Ei0BbtHNZZAbEWe6GcBAki0DOBVWz9ZJn9iAICAiAAAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAjoQRAkx/Z8VEWQnJG68vwQYG2RPrbHfb53HoE+GM91jrAHcp1x9lTiBA4EScudlZ9x4D7sbzCpvYwLbnAgIDWLb/iigBCQUh0pimsXgtIbfr3KTsN2yonAawEBEAABAQEBAQEBAQEBAQEBAQEBAQEBWa2jqq53BIygagO08BBI88eiqg3QwkPA6x+LKvbENKdhe9o6MC/Tart3/mKyz82PQkGgdAOUeaWlPzkk13vaQzMv0xqmWkowPSJc5+b7qQs77OounP52ls7psj7L5mD8gm0GH2WapruaYmRlho5xKKOhPRhUaTBretRf25P4N4oToyrkBKXzQS2cOLA2hmv782ZpJxiHhMBqHNg9E99WU6lwUuJRJs+9lNvFJgyKuzJ7KdMHqNYvs0xZfSZHQTlB/HYn2rSSEGeLwDIsJ4jdwGoluyxqLJ7qN3vb57uF9D+sYq3arjcsZm4QaxNOWZRIepZ9tbpkPUF4PrEuqLrA5JVUqqvy56DHmoIIS3dvf70OzweOYrtvaqxWNBL+VnuzSLfdbvr6n6JzSsX6Sa8f+3Uz9+kk2288HGX9oEDrTrAEqKzLulG/KGeGIdX+OEfgEGIusCU8KwXQ6oWZC1Li3qIQwMecgw6CRMKN91cXgO30MQB8i9V8MUmZv9tGvQcCcJSw6nVni6dWq7Vd1g/DmMq9H+keEnUqDuNK+bHePwRBEARBEAT5oP8AuiBU9EGds40AAAAASUVORK5CYII=' alt='' />
        </label>
        <button>Send</button>
      </div>
    </div>
  )
}

export default Input;