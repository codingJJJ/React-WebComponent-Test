import React from 'react';
import { render } from 'react-dom';

import custom from './customTable';
window.customElements.define("my-custom-table", custom)

const App = () => {
  const ref= React.useRef()

  React.useEffect(() => {
    const dataSource = [
      {
        name: "stj",
        age: 18,
        male: "男"
      },
      {
        name: "hz",
        age: 20,
        male: "女"
      },
      {
        name: "ks",
        age: 60,
        male: "男"
      },
    ];
    const columns = [
      {
        dataIndex: "name",
        title: "姓名",
        width: 200
      },
      {
        dataIndex: "age",
        title: "年龄",
        width: 100
      },
      {
        dataIndex: "male",
        title: "性别",
        width: 100
      },
      {
        title: "操作",
        render(args) {
          return `<td class="center">
            <button>增加</button>

            <button>删除</button>  
            </td>`
        },
        width: 300
      },
    ]
    ref.current.render(dataSource, columns)
  }, [])

  return <my-custom-table ref={ref} width="400" />
}

render(<App />, document.getElementById("root"))