class Save {
  constructor(config) {
    if (typeof(config) == "undefined") config = {}
    this.name = config.name || "未命名存档";
    this.desc = config.desc || "没有存档描述";
    this.data = config.data || "";
    this.author = config.author || "0100000a7";
    this.id = NaN
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
    return `<div class="saves"><span style="font-size: 20px">${this.name}</span><br><span style="font-size: 15px; font-style: italic">${this.desc}</span><br><span style="font-size: 10px">由${this.author}上传</span><br><button class='btn' onclick='saves.categories[${this.categoryId}].saves[${this.id}].copy()'>粘贴至剪贴板</button> <button class='btn' onclick='saves.categories[${this.categoryId}].saves[${this.id}].save()'>以.txt形式保存</button></div><br><br>`
  }
}
class Category {
  constructor(name,styles,saves) {
    this.name = name
    this.styles = styles || ""
    this.styles += "font-size:24px"
    this.saves = saves
    for(let i = 0; i < saves.length; i++) {
      this.saves[i].id = i
    }
  }
  applyHTML() {
    let tempHTML = ''
    tempHTML += `<div class="saves" style="${this.styles}" onclick="displays[${this.id}] = displays[${this.id}]? false : true"><span>${this.name}<span id="categoryText${this.id}"></span></div><br><br><div id="category${this.id}">`
    for(let i = 0; i < this.saves.length; i++) tempHTML += this.saves[i].toFormat()
    document.getElementById('saves').innerHTML += tempHTML + "</div>"
  }
  toFolderInZipFile() {
    let folder = fullsaves.folder(`(${this.id+1}) `+this.name)
    for(let i = 0; i < this.saves.length; i++) folder.file(`(${this.saves[i].id+1}) ${this.saves[i].name}.txt`,this.saves[i].data)
  }
  mergeIdToSaves() {
    for(let i = 0; i < this.saves.length; i++) {
      this.saves[i].categoryId = this.id
    }
  }
}
class CategorySaveGroup {
  constructor(categories) {
    this.categories = categories
    for(let i = 0; i < this.categories.length; i++) {
      this.categories[i].id = i
      this.categories[i].mergeIdToSaves()
    }
  }
  applyAllHTML() {
    for(let i = 0; i < this.categories.length; i++) {
      this.categories[i].applyHTML()
    }
  }
  createZip() {
    for(let i = 0; i < this.categories.length; i++) this.categories[i].toFolderInZipFile()
  }
}