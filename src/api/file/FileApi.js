import http from '@/util/http'

class  FileApi {


	page(params){
		var url = '/share-file/file/findFileInfo';
		return http.post(url, params);
	}

	add(params){
		var url = '/share-file/file/add';
		return http.post(url, params);
	}

	delete(params){
		
		var url = '/share-file/file/delete';
		return http.post(url, params);
	}

	update(params){
		
		var url = '/share-file/file/update';
		return http.post(url, params);
	}

	preview(params){
		
		var url = '/share-file/file/preview';
		http.preview(url, params);
	}

	download(params){
		
		var url = '/share-file/file/download';
		http.download(url, params);
	}

    download2(params){

        var url = '/share-file/file/download';
        http.download2(url, params);
    }

}

export default FileApi