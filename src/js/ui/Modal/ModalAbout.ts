import MfunsPlayer from "@/player"
import { classPrefix, developers, repositoryLink } from "@/const"
import { html, render } from "lit-html"

const template = () => html`
  <div class="${classPrefix}-modal-panel ${classPrefix}-about">
    <div>Mfuns Player</div>
    <div>version ${MfunsPlayer.version}-${MfunsPlayer.gitHash}</div>
    <div>开源项目地址 <a href="${repositoryLink}">github</a></div>
    <div>开发者</div>
    <ul>
      ${developers.map(
        ({ name, id, link }) => html`
          <li>
            <span>${name}</span>
            <a href="${link}">github</a>
          </li>
        `
      )}
      <li></li>
    </ul>
  </div>
`

export default class ModalAbout {
  title = ""
  el: HTMLElement
  constructor() {
    const fragment = new DocumentFragment()
    render(template(), fragment)
    this.el = fragment.querySelector(`.${classPrefix}-modal-panel`)!
  }
}
