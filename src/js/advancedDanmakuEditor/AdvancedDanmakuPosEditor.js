/**
 * 高级弹幕编辑器(定位弹幕)
 * 适用于mfuns定位弹幕(mode=7)的弹幕编辑
*/

class AdvancedDanmakuPosEditor {
    constructor(player, el, options = {}) {
        this.player = player
        this.el = el
        this.template = this.player.template
        this.c = {}    // 内部组件
        this.options = options
        this.keyFrames = []
        this.currentKeyFrame = 0        // 当前关键帧
        this.autoCurrentTime = true     // 是否自动使用当前时间

        this.init()
        this.applyDanmaku(this.options.d || {})
    }
    init() {
        const $ = this.el.querySelector.bind(this.el);
        
        this.template.ade_pos_preview = $(".mfunsPlayer-ade-preview");   // 高级弹幕编辑预览
        this.template.ade_pos_emit = $(".mfunsPlayer-ade-emit");         // 高级弹幕发送

        this.template.ade_pos_preview.onclick = () => { this.preview() }
        this.template.ade_pos_emit.onclick = () => { this.send() }

        this.c.area_content = $(".PosEditor-area-content")
        this.c.area_attribute = $(".PosEditor-area-attribute")

        this.c.input_content = $(".PosEditor-input-content")
        this.c.input_color = $(".PosEditor-input-color")
        this.c.input_size = $(".PosEditor-input-size")
        this.c.input_font = $(".PosEditor-input-font")
        this.c.input_bold = $(".PosEditor-input-bold")
        this.c.input_shadow_color = $(".PosEditor-input-shadow-color")
        this.c.input_shadow_x = $(".PosEditor-input-shadow-x")
        this.c.input_shadow_y = $(".PosEditor-input-shadow-y")
        this.c.input_shadow_blur = $(".PosEditor-input-shadow-blur")
        this.c.input_stroke_color = $(".PosEditor-input-stroke-color")
        this.c.input_stroke_width = $(".PosEditor-input-stroke-width")
        this.c.input_start = $(".PosEditor-input-start")
        this.c.input_zIndex = $(".PosEditor-input-zIndex")
        this.c.input_anchor_x = $(".PosEditor-input-anchor-x")
        this.c.input_anchor_y = $(".PosEditor-input-anchor-x")
        this.c.input_duration = $(".PosEditor-input-duration")

        this.c.switch_shadow = $(".PosEditor-switch-shadow")
        this.c.switch_stroke = $(".PosEditor-switch-stroke")
        this.c.switch_current = $(".PosEditor-switch-current")

        this.c.input_a_duration = $(".PosEditor-input-a-duration")
        this.c.input_x = $(".PosEditor-input-x")
        this.c.input_y = $(".PosEditor-input-y")
        this.c.input_rx = $(".PosEditor-input-rx")
        this.c.input_ry = $(".PosEditor-input-ry")
        this.c.input_rz = $(".PosEditor-input-rz")
        this.c.input_scale_x = $(".PosEditor-input-scale-x")
        this.c.input_scale_y = $(".PosEditor-input-scale-y")
        this.c.input_opacity = $(".PosEditor-input-opacity")
        this.c.input_ease = $(".PosEditor-input-ease")

        this.c.switch_position = $(".PosEditor-switch-position")
        this.c.switch_rotation = $(".PosEditor-switch-rotation")
        this.c.switch_scale = $(".PosEditor-switch-scale")
        this.c.switch_opacity = $(".PosEditor-switch-opacity")

        this.c.action_getCurrentTime = $(".PosEditor-action-getCurrentTime")
        this.c.action_delKeyFrame = $(".PosEditor-action-delKeyFrame")
        this.c.action_addKeyFrame = $(".PosEditor-action-addKeyFrame")
        this.c.list_keyFrames = $(".PosEditor-keyframes")
        this.c.area_animation_settings = $(".PosEditor-animation-settings")

        this.c.action_getCurrentTime.onclick = () => { this.getCurrentTime() }
        this.c.action_delKeyFrame.onclick = () => { this.delKeyFrame() }
        this.c.action_addKeyFrame.onclick = () => { this.addKeyFrame() }

        this.c.switch_shadow.onchange = (e) => {this.c.area_content.classList.toggle("Pos-use-shadow", e.currentTarget.checked)}
        this.c.switch_stroke.onchange = (e) => {this.c.area_content.classList.toggle("Pos-use-stroke", e.currentTarget.checked)}
        
        this.c.switch_position.onchange = (e) => {this.c.area_animation_settings.classList.toggle("Pos-use-position", e.currentTarget.checked)}
        this.c.switch_rotation.onchange = (e) => {this.c.area_animation_settings.classList.toggle("Pos-use-rotation", e.currentTarget.checked)}
        this.c.switch_scale.onchange = (e) => {this.c.area_animation_settings.classList.toggle("Pos-use-scale", e.currentTarget.checked)}
        this.c.switch_opacity.onchange = (e) => {this.c.area_animation_settings.classList.toggle("Pos-use-opacity", e.currentTarget.checked)}

    }
    addKeyFrame() {   // 在第n关键帧后添加新关键帧
        this.saveKeyFrame()
        let n = this.currentKeyFrame
        let newKeyFrame = Object.assign({duration: 1000}, this.keyFrames[n])  // 复制关键帧
        console.log(n)
        this.keyFrames.splice(n + 1, 0, newKeyFrame)
        this._keyframeBarAdd()
        this.switchKeyFrame(n + 1)
    }
    delKeyFrame() {   // 删除第n关键帧
        let n = this.currentKeyFrame
        if (this.keyFrames.length < 2) {
            console.log("不能删除唯一的帧")
        } else {
            console.log(n)
            this.keyFrames.splice(n, 1)
            this._keyframeBarMinus()
            if (n == 0) {   // 删除后需要切换至其他帧
                this.switchKeyFrame(0, "unsave")
            } else {
                this.switchKeyFrame(n - 1, "unsave")
            }
        }
    }
    switchKeyFrame(n, unsave) {    // 切换至第n关键帧
        if (n != this.currentKeyFrame || unsave) {
            unsave || this.saveKeyFrame()
            this.currentKeyFrame = n
            let label_on = this.c.list_keyFrames.querySelector(".item-on")
            label_on && label_on.classList.remove("item-on")
            this.c.list_keyFrames.querySelector(`span:nth-child(${n + 1})`).classList.add("item-on")
            this.c.area_animation_settings.setAttribute("data-frame", n)
            this.applyKeyFrame()
        } else {
            this.saveKeyFrame()
            console.log(this.keyFrames[n])
        }
    }
    getCurrentTime() {  // 捕捉当前时间
        this.c.input_start.value = parseInt(this.player.video.currentTime * 1000)
    }
    useAutoCurrentTime(b) {  // 自动使用当前时间
        this.autoCurrentTime = b
    }
    getDanmakuData() {      // 生成弹幕, 并对部分未设置的值进行属性删除处理，以减小弹幕字符串大小
        this.saveKeyFrame()
        let d = {
            content: this.c.input_content.value,
            color: this.c.input_color.value,
            size: Number(this.c.input_size.value),
            font: this.c.input_font.value,
            bold: this.c.input_bold.checked,
            ratative: 800,
            shadow: this.c.switch_shadow.checked ? [
                this.c.input_shadow_color.value,
                Number(this.c.input_shadow_x.value),
                Number(this.c.input_shadow_y.value),
                Number(this.c.input_shadow_blur.value),
            ] : undefined,
            stroke: this.c.switch_stroke.checked ? [
                this.c.input_stroke_color.value,
                Number(this.c.input_stroke_width.value),
            ] : undefined,
            start: this.c.switch_current.checked ? undefined : Number(this.c.input_start.value),
            zIndex: Number(this.c.input_zIndex.value),
            anchor: [Number(this.c.input_anchor_x.value), Number(this.c.input_anchor_y.value)],
            duration: Number(this.c.input_duration.value),
            // 分离初始帧数据
            position: this.keyFrames[0].position,
            rotation: this.keyFrames[0].rotation,
            scale: this.keyFrames[0].scale,
            opacity: this.keyFrames[0].opacity,
            animations: this.keyFrames.slice(1),
        }
        console.log(d)
        return d
    }
    generateDanmaku() {
        let d = this.getDanmakuData()
        return JSON.stringify(d)
    }
    saveKeyFrame() {        // 表单内容存入关键帧列表
        let k = this.keyFrames[this.currentKeyFrame]
        if (this.currentKeyFrame) {
            k.duration = Number(this.c.input_a_duration.value)
            k.ease = Number(this.c.input_ease.value)
        }
        k.position = this.c.switch_position.checked ? [Number(this.c.input_x.value), Number(this.c.input_y.value)] : undefined
        k.rotation = this.c.switch_rotation.checked ? [Number(this.c.input_rx.value), Number(this.c.input_ry.value), Number(this.c.input_rz.value)] : undefined
        k.scale = this.c.switch_scale.checked ? [Number(this.c.input_scale_x.value), Number(this.c.input_scale_y.value)] : undefined
        k.opacity = this.c.switch_opacity.checked ? Number(this.c.input_opacity.value) : undefined
    }
    applyKeyFrame() {       // 关键帧应用于表单
        let k = this.keyFrames[this.currentKeyFrame]
        this.c.input_a_duration.value = k.duration || 0
        this.c.input_x.value = k.position ? k.position[0] : 0
        this.c.input_y.value = k.position ? k.position[1] : 0
        this.c.input_rx.value = k.rotation ? k.rotation[0] : 0
        this.c.input_ry.value = k.rotation ? k.rotation[1] : 0
        this.c.input_rz.value = k.rotation ? k.rotation[2] : 0
        this.c.input_scale_x.value = k.scale ? k.scale[0] : 1
        this.c.input_scale_y.value = k.scale ? k.scale[1] : 1
        this.c.input_opacity.value = k.opacity != undefined ? k.opacity : 1

        this.c.switch_position.checked = Boolean(k.position)
        this.c.switch_rotation.checked = Boolean(k.rotation)
        this.c.switch_scale.checked = Boolean(k.scale)
        this.c.switch_opacity.checked = k.opacity != undefined

        this.c.area_animation_settings.classList.toggle("Pos-use-position", Boolean(k.position))
        this.c.area_animation_settings.classList.toggle("Pos-use-rotation", Boolean(k.rotation))
        this.c.area_animation_settings.classList.toggle("Pos-use-scale", Boolean(k.scale))
        this.c.area_animation_settings.classList.toggle("Pos-use-opacity", k.opacity != undefined)
        
    }
    applyDanmaku(d) {       // 弹幕应用于表单
        this.c.input_content.value = d.content || ""
        this.c.input_color.value = d.color || "#ffffff"
        this.c.input_size.value = d.size || "36"
        this.c.input_font.value = d.font || "SimHei"
        this.c.input_bold.checked = d.bold || false

        this.c.switch_shadow.checked = Boolean(d.shadow)
        this.c.area_content.classList.toggle("Pos-use-shadow", Boolean(d.shadow))
        if (d.shadow) {
            this.c.input_shadow_color.value = d.shadow[0] || "#000000"
            this.c.input_shadow_x.value = d.shadow[1] || 0
            this.c.input_shadow_y.value = d.shadow[2] || 0
            this.c.input_shadow_blur.value = d.shadow[3] || 0
        }
        this.c.switch_stroke.checked = Boolean(d.stroke)
        this.c.area_content.classList.toggle("Pos-use-stroke", Boolean(d.stroke))
        if (d.stroke) {
            this.c.input_stroke_color.value = d.stroke[0] || "#000000"
            this.c.input_stroke_width.value = d.stroke[1] || 0
        }
        this.c.input_start.value = d.start || 0
        this.c.input_zIndex.value = d.zIndex || 50
        this.c.input_duration.value = d.duration || 1000

        this.c.switch_current.checked = d.start == undefined    // 如果未设置发送时间，则开启当前时间发送

        this.keyFrames = [
            {
                position: d.position || [0, 0],
                rotation: d.rotation,
                scale: d.scale,
                opacity: d.opacity,
            }
        ].concat(d.animations || [])
        this.applyKeyFrame()
        this.initKeyframeBar()
    }
    initKeyframeBar() {
        let list = document.createDocumentFragment()
        for (let i = 0; i < this.keyFrames.length; i++) {
            let btn = document.createElement("span")
            btn.innerText = i
            btn.setAttribute("data-value", i)
            btn.onclick = () => {this.switchKeyFrame(i)}
            if (i == this.currentKeyFrame) {
                btn.classList.add("item-on")
            }
            list.appendChild(btn)
        }
        this.c.list_keyFrames.appendChild(list)
    }
    _keyframeBarAdd() {
        let n = this.c.list_keyFrames.childElementCount
        let btn = document.createElement("span")
        btn.innerText = n
        btn.setAttribute("data-value", n)
        btn.onclick = () => {this.switchKeyFrame(n)}
        this.c.list_keyFrames.appendChild(btn)
    }
    _keyframeBarMinus() {
        this.c.list_keyFrames.removeChild(this.c.list_keyFrames.lastElementChild)
    }
    preview() {
        let danmaku = {
            text: this.c.input_content.value,
            content: this.generateDanmaku(),
            time: this.c.switch_current.checked ? this.player.video.currentTime*1000 : Number(this.c.input_start.value),
            id: `preview-${Date.now()}`
        }
        if (!this.c.switch_current.checked) {
            this.player.seek(danmaku.time / 1000)
        }
        window.requestAnimationFrame(() => {
            this.player.advancedDanmaku.posDanmaku.playDanmaku(danmaku)
        })
    }
    send() {
        let danmaku = {
            text: this.c.input_content.value,
            content: this.generateDanmaku(),
            time: this.c.switch_current.checked ? this.player.video.currentTime*1000 : Number(this.c.input_start.value)
        }
        console.log(JSON.parse(this.generateDanmaku()))
        console.log(danmaku)
        this.player.advancedDanmaku.posDanmaku.addDanmaku(danmaku)
        if (this.c.switch_current.checked) {
            this.player.advancedDanmaku.posDanmaku.playDanmaku(danmaku)
        }
    }
}
export default AdvancedDanmakuPosEditor