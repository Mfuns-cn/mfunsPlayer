import MfunsPlayer from "@/player"
import { classPrefix, developers, repositoryLink } from "@/const"
import { html, render } from "lit-html"

const template = () => html`
  <div class="${classPrefix}-modal-panel ${classPrefix}-about">
    <div class="${classPrefix}-about-logo"></div>
    <div class="${classPrefix}-about-version">
      version ${MfunsPlayer.version}-${MfunsPlayer.gitHash}
    </div>
    <div>github: <a href="${repositoryLink}" target="_blank">github</a></div>
    <div>开发者</div>
    <ul class="${classPrefix}-about-developers">
      ${developers.map(
        ({ name, id, link }) => html`
          <li>
            <a href="${link}" target="_blank">${name}</a>
          </li>
        `
      )}
      <li></li>
    </ul>
  </div>
`

export default class ModalAbout {
  title = "关于"
  el: HTMLElement
  constructor() {
    const fragment = new DocumentFragment()
    render(template(), fragment)
    this.el = fragment.querySelector(`.${classPrefix}-modal-panel`)!
  }
}
