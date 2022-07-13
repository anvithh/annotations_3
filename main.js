const selectableTextArea = document.querySelectorAll(".selectable-text-area");
const highlight = document.querySelector("#highlight");

selectableTextArea.forEach(elem => {
  elem.addEventListener("mouseup", selectableTextAreaMouseUp);
});

highlight.addEventListener("click", getSelectionHtml);

document.addEventListener("mousedown", documentMouseDown);

function selectableTextAreaMouseUp(event) {
  setTimeout(() => {
    const selectedText = window.getSelection().toString().trim();
    if(selectedText.length) { 
      const x = event.pageX;
      const y = event.pageY;
      const highlightWidth = Number(getComputedStyle(highlight).width.slice(0,-2));
      const highlightHeight = Number(getComputedStyle(highlight).height.slice(0,-2));

      if(document.activeElement !== highlight) {
        highlight.style.left = `${x - highlightWidth*0.5}px`;
        highlight.style.top = `${y - highlightHeight*1.25}px`;
        highlight.style.display = "block";
        highlight.classList.add("btnEntrance");
      }
      else {
        highlight.style.left = `${x-highlightWidth*0.5}px`;
        highlight.style.top = `${y-highlightHeight*0.5}px`;
      }
    }    
  }, 0); 
}

function documentMouseDown(event) {
  if(event.target.id!=="highlight" && getComputedStyle(highlight).display==="block") {
    highlight.style.display = "none";
    highlight.classList.remove("btnEntrance");
    window.getSelection().empty();
  }
}


function getSelectionHtml() {
    var sel, range, node;
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            range = window.getSelection().getRangeAt(0);
            
            var html = '<span style="background: yellow;">' + range + '</span>'
            range.deleteContents();
            
            var el = document.createElement("div");
            el.innerHTML = html;
            var frag = document.createDocumentFragment(), node, lastNode;
            while ( (node = el.firstChild) ) {
                lastNode = frag.appendChild(node);
            }
            range.insertNode(frag);
        }
    } else if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        range.collapse(false);
        range.pasteHTML(html);
    }

}