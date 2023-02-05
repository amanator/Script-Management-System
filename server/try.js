const fs = require('fs')

const rawData = fs.readFileSync('data.txt').toString()
let data = JSON.parse(rawData)
const para = data.FinalDraft.Content.Paragraph

para.map((e)=>{
    if('SceneProperties' in e)
    {
        // console.log(e.SceneProperties._Length)
        // console.log(e.SceneProperties.Summary) 
        sceneNo = e._Number 
        length = eval(e.SceneProperties._Length )
        ie = e.Text[0]
        dn = e.Text[2]
        description = e.SceneProperties.Summary.Paragraph.Text.__text
        // console.log(e._Number)
        console.log(sceneNo, length, ie, dn, description)
    }
})

// function scene_tag(para) {

//     let arr = new Map()
//     let i = 0;
//     para.map((e) => {
//         if ("SceneProperties" in e) {
//             i++;
//         }
//         if ('Text' in e) {
//             if (typeof (e.Text) == 'object') {
//                 e.Text.map((val) => {
//                     if (typeof (val) == 'object') {
//                         if ("_TagNumber" in val) {
//                             // console.log(i,val._TagNumber)
//                             arr.set(val._TagNumber, i)
//                         }
//                     }
//                 })
//             }
//         }
//     })
//     return arr;
// }

// const para = data.FinalDraft.Content.Paragraph
const TagCategory = data.FinalDraft.TagData.TagCategories.TagCategory
const TagDefinition = data.FinalDraft.TagData.TagDefinitions.TagDefinition
const Tags = data.FinalDraft.TagData.Tags.Tag

let arr = scene_tag(para)

let info = []
let scene = new Set()
for (let i = 0; i < TagCategory.length; i++) {
    let obj = { category: "", items: [] }
    obj.category = TagCategory[i]._Name;
    let items = []
    for (let j = 0; j < TagDefinition.length; j++) {
        if (TagCategory[i]._Id == TagDefinition[j]._CatId) {
            Tags.map((e) => {
                if ((typeof e.DefId) == "object") {
                    e.DefId.map((v) => {
                        if(v == TagDefinition[j]._Id)
                        {
                            if (arr.has(e._Number)) 
                            {
                                scene.add(arr.get(e._Number))
                            }

                        }
                    })
                }
                else if (e.DefId === TagDefinition[j]._Id) {

                    if (arr.has(e._Number)) {
                        scene.add(arr.get(e._Number))
                    }
                }
            })
            let ar = []
            scene.forEach((e)=>ar.push(e))
            items.push({name:TagDefinition[j]._Label, scene:ar})
            scene.clear()
        }
    }
    obj.category = TagCategory[i]._Name
    obj.items = items
    info.push(obj)

}
// console.log(info[0].items)

// console.log(Tags)