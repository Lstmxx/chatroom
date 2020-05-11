import { Message } from 'element-ui'

export function copyToClip (content) {
  const aux = document.createElement('input')
  aux.setAttribute('value', content)
  document.body.appendChild(aux)
  aux.select()
  document.execCommand('copy')
  document.body.removeChild(aux)
  Message.success('复制成功')
}
