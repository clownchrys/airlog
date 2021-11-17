import axios from "axios";

const IMAGE_UPLOAD_PARAM = "file";

const baseConfig = {
  placeholderText: '내용을 입력해주세요',
  charCounterCount: false,
  immediateReactModelUpdate: false,
  attribution: false, // Remove the Powered By Froala message
  autofocus: false,
  // height: 500,
  heightMin: 100,
  heightMax: 700,
  // zIndex: 0, // not working unexpectedly
}

const requestConfig = {
  requestHeaders: {
    // custom_header: 'custom_header_value',
    // another_custom_header: 'another_custom_header_value'
  },
  requestWithCORS: false,
  requestWithCredentials: false,
}

// https://froala.com/wysiwyg-editor/examples/toolbar-buttons-3/
const toolbarConfig = {
  toolbarSticky: false,
  toolbarStickyOffset: 70,

  toolbarButtons: {
    moreText: {
      buttons: [
        // 'fontFamily',
        'fontSize',
        'textColor',
        'backgroundColor',
        'bold',
        'italic',
        'underline',
        'strikeThrough',
        'subscript',
        'superscript',
        'inlineClass',
        // 'inlineStyle',
        'clearFormatting'
      ],
      align: 'left',
      buttonsVisible: 3
    },
    moreParagraph: {
      buttons: [
        'alignLeft',
        'alignCenter',
        'alignRight',
        'alignJustify',
        // 'formatOLSimple',
        'formatOL',
        'formatUL',
        'paragraphFormat',
        'paragraphStyle',
        'lineHeight',
        'outdent',
        'indent',
        'quote'
      ],
      align: 'left',
      buttonsVisible: 4
    },
    moreRich: {
      buttons: [
        'insertTable',
        'insertImage',
        'insertVideo',
        'insertLink',
        'emoticons',
        'fontAwesome',
        'specialCharacters',
        'embedly',
        // 'insertFile',
        'insertHR'
      ],
      align: 'left',
      buttonsVisible: 3
    },
    moreMisc: {
      buttons: [
        // 'undo',
        // 'redo',
        // 'fullscreen',
        // 'print',
        // 'getPDF',
        // 'spellChecker',
        // 'selectAll',
        'html',
        'help',
      ],
      align: 'right',
      buttonsVisible: 2
    }
  },
  toolbarButtonsMD: [ 'bold' ]
}

const quickInsertConfig = {
  quickInsertEnabled: true,
  quickInsertButtons: [ 'image', 'video', 'embedly', 'table', 'ul', 'ol', 'hr' ],
}

const imageConfig = {
  imageResize: true,
  imagePaste: true,
  imagePasteProcess: true,
  imageAddNewLine: false, // Add new line after image inserted
  imageMaxSize: 5 * 1024 * 1024, // Set max image size to 5MB.
  imageAllowedTypes: [ 'jpeg', 'jpg', 'png', 'gif', 'webp' ], // Allow to upload PNG and JPG.
  imageInsertButtons: [ 'imageBack', '|', 'imageUpload', 'imageByURL' ],
  imageEditButtons: [ 'imageReplace', 'imageAlign', 'imageCaption', 'imageRemove', '|', 'imageLink', 'linkOpen', 'linkEdit', 'linkRemove', '-', 'imageDisplay', 'imageStyle', 'imageAlt', 'imageSize' ],

  imageUpload: true,
  imageUploadToS3: false,
  imageUploadRemoteUrls: false,
  imageUploadMethod: 'POST', // Set request type.
  imageUploadURL: "/api/express/upload/image", // Set the image upload URL. (returning JSON obj containing link parameter)
  imageUploadParam: IMAGE_UPLOAD_PARAM, // Set the image upload parameter. (form-data: files)
  imageUploadParams: {
    proxyRoot: process.env.NEXT_PUBLIC_BASE_URL + "/api/express/upload",
    targetParameter: IMAGE_UPLOAD_PARAM
    // Additional upload params. (form-data: fields)
  },
}

const videoConfig = {
  videoResize: true,
  videoResponsive: true,
  videoMaxSize: 1024 * 1024 * 30,
  videoAllowedTypes: [ 'mp4', 'webm', 'ogg' ],
  videoInsertButtons: [ 'videoBack', '|', 'videoByURL', 'videoEmbed' ],
  videoEditButtons: [ 'videoReplace', 'videoRemove', '|', 'videoDisplay', 'videoAlign', 'videoSize', 'autoplay' ],
  videoSizeButtons: [ 'videoBack', '|' ],
  // no plan to be uploaded for video currently
}

const fileConfig = {

}

const events = {
  support: {
    removeCommercialBanner: function () {
      const wrapper = document.querySelector<HTMLDivElement>("div.fr-wrapper");
      const firstChild = wrapper?.firstElementChild;
      if ( wrapper && firstChild && !firstChild.className ) {
        wrapper.removeChild(firstChild);
      }
    },
  },
  "initialized": function () {
    // this keyword is the editor instance.
    events.support.removeCommercialBanner();
  },
  "contentChanged": function () {
    // this keyword is the editor instance.
    events.support.removeCommercialBanner();
  },
  "destroy": function () {
    // alert("에디터를 종료합니다")
  },
  "image.beforeUpload": function (images: FileList) {
    const file = images.item(0);
    if (!file) {
      alert("No image file");
      return false; // Return false if you want to stop the image upload.
    }
  },
  "image.uploaded": function (response: string) {
    // Image was uploaded to the server.
  },
  "image.inserted": function (elements: HTMLImageElement[], response: string) {
    // Image was inserted in the editor.
  },
  "image.replaced": function (elements: HTMLImageElement[], response: string) {
    // Image was replaced in the editor.
  },
  "image.removed": function (elements: HTMLImageElement[]) {
    // Image was removed in the editor.
    const { src } = elements[0];
    axios.delete(src, { timeout: 60 * 1000, withCredentials: true }).catch(
      err => console.error("failed to DELETE request: ", err)
    )
  },
  "image.error": function (error: { code: number, message: string }, response: string) {
    console.log({ error, response })
    let display: string = "";

    if (error.code == 1) {
      display = "이미지의 주소가 정확하지 않습니다";
    } else if (error.code == 2) {
      console.log("No link in upload response")
    } else if (error.code == 3) {
      display = "이미지 업로드중에 오류가 발생했습니다";
    } else if (error.code == 4) {
      display = "파일 업로드에 실패했습니다";
    } else if (error.code == 5) {
      display = "이미지의 크기가 5MB를 초과했습니다";
    } else if (error.code == 6) {
      display = `다음 확장자만 사용할 수 있습니다: ${ imageConfig.imageAllowedTypes.join(", ") }`;
    } else if (error.code == 7) {
      console.log("Image can be uploaded only to same domain in IE 8 and IE 9")
    } else {
      display = "알 수 없는 오류";
    }

    // Response contains the original server response to the request if available.
    if (response) {
      display += ` (message: ${ response })`
    }

    // give information
    const elem = document.querySelector<HTMLElement>(".fr-message");
    if (elem && display) {
      elem.innerText = display;
      document.body.focus();
    } else {
      alert(display);
    }
  }
}

const config = {
  ...baseConfig,
  ...requestConfig,
  ...toolbarConfig,
  ...quickInsertConfig,
  ...imageConfig,
  ...videoConfig,
  ...fileConfig,
  events
};

export default config;