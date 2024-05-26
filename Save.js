class Save {
  constructor(config) {
    if (typeof(config) == "undefined") config = {}
    this.name = config.name || "未命名存档";
    this.desc = config.desc || "没有存档描述";
    this.data = config.data || "";
    this.author = config.author || "";
    this.id = config.id
  }
  copy() {
    navigator.clipboard.writeText(this.data)
  }
  save() {
    let str = this.data
    let file = new Blob([str], {
      type: "text/plain"
    })
    window.URL = window.URL || window.webkitURL;
    let a = document.createElement("a")
    a.href = window.URL.createObjectURL(file)
    a.download = this.name + ".txt"
    a.click()
  }
  toFormat() {
    return `<div class="saves"><span style="font-size: 20px">${this.name}</span><br><span style="font-size: 15px; font-style: italic">${this.desc}</span><br><span style="font-size: 10px">由${this.author}上传</span><br><button class='btn' onclick='Saves[${this.id}].copy()'>粘贴至剪贴板</button> <button class='btn' onclick='Saves[${this.id}].save()'>以.txt形式保存</button></div>`
  }
}