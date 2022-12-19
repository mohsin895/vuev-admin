const mixin = {
    data() {
        return {
            hello: 'great'
        }
    },
    methods: {
        // convert all property to formdate 
        formData(obj) {
            let formdata = new FormData();
            for (const key in obj) {
                formdata.append(key, obj[key]);
            }
            if (this.type === 'update') {
                formdata.append('_method', 'PUT');
            }
            return formdata;
        },
        checkLang(nodeList) {
            const listLength = nodeList.length;
            for (let index = 0; index < listLength; index++) {
                const element = nodeList[index];
                if (element.type != 'file') {
                    const checkLangPattern = /[a-z]/i;
                    element.addEventListener('input', function() {
                        if (checkLangPattern.test(this.value)) {
                            this.value = null;
                            toast.error({
                                position: 'topRight',
                                title: 'বাংলায় লিখুন',
                                message: ''
                            });
                        }
                    });
                }
            }
        }
    }
}
export default mixin;