saves = new CategorySaveGroup([
  pre_world,
  world,
  universe,
  chaos,
  voids,
  theorem,
  reality,
  beyond
])
saves.applyAllHTML()
/*待会直接复制粘贴
new Save({
    name: '开局档',
    desc: '',
    data: '',
  }),
*/
const fullsaves = new JSZip()
saves.createZip()
function DownloadAllSaves() {
  fullsaves.generateAsync({type:"blob"}).then(function(content) {
    window.URL = window.URL || window.webkitURL;
    let a = document.createElement("a")
    a.href = window.URL.createObjectURL(content)
    a.download = "所有存档.zip"
    a.click()
  });
}
var displays = Array(8).fill(false)
function updateDisplay() {
  for (let i = 0;i < displays.length;i++) {
    document.getElementById(`category${i}`).style.display = displays[i]? 'block' : 'none'
    document.getElementById(`categoryText${i}`).innerHTML = displays[i]? '▶' : '▼'
  }
}
setInterval(updateDisplay)