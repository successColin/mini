function dataUrlToBase64(str) {
    var array = str.split(',')
    return array[array.length - 1]
}

export default function base64ToPath(base64) {
    return new Promise(function(resolve, reject) {
        if (typeof window === 'object' && 'document' in window) {
            base64 = base64.split(',')
            var type = base64[0].match(/:(.*?);/)[1]
            var str = atob(base64[1])
            var n = str.length
            var array = new Uint8Array(n)
            while (n--) {
                array[n] = str.charCodeAt(n)
            }
            return resolve((window.URL || window.webkitURL).createObjectURL(new Blob([array], { type: type })))
        }
        var extName = base64.split(',')[0].match(/data\:\S+\/(\S+);/)
        if (extName) {
            extName = extName[1]
        } else {
            reject(new Error('base64 error'))
        }
        var fileName = getNewFileId() + '.' + extName
        if (typeof plus === 'object') {
            var basePath = '_doc'
            var dirPath = 'uniapp_temp'
            var filePath = basePath + '/' + dirPath + '/' + fileName
            if (!biggerThan(plus.os.name === 'Android' ? '1.9.9.80627' : '1.9.9.80472', plus.runtime.innerVersion)) {
                plus.io.resolveLocalFileSystemURL(basePath, function(entry) {
                    entry.getDirectory(dirPath, {
                        create: true,
                        exclusive: false,
                    }, function(entry) {
                        entry.getFile(fileName, {
                            create: true,
                            exclusive: false,
                        }, function(entry) {
                            entry.createWriter(function(writer) {
                                writer.onwrite = function() {
                                    resolve(filePath)
                                }
                                writer.onerror = reject
                                writer.seek(0)
                                writer.writeAsBinary(dataUrlToBase64(base64))
                            }, reject)
                        }, reject)
                    }, reject)
                }, reject)
                return
            }
            var bitmap = new plus.nativeObj.Bitmap(fileName)
            bitmap.loadBase64Data(base64, function() {
                bitmap.save(filePath, {}, function() {
                    bitmap.clear()
                    resolve(filePath)
                }, function(error) {
                    bitmap.clear()
                    reject(error)
                })
            }, function(error) {
                bitmap.clear()
                reject(error)
            })
            return
        }
        if (typeof wx === 'object' && wx.canIUse('getFileSystemManager')) {
            var filePath = wx.env.USER_DATA_PATH + '/' + fileName
            wx.getFileSystemManager().writeFile({
                filePath: filePath,
                data: dataUrlToBase64(base64),
                encoding: 'base64',
                success: function() {
                    resolve(filePath)
                },
                fail: function(error) {
                    reject(error)
                }
            })
            return
        }
        reject(new Error('not support'))
    })
}