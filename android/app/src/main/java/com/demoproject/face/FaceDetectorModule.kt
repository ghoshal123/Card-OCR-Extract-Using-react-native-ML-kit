package com.demoproject.face

import android.graphics.BitmapFactory
import com.facebook.react.bridge.*
import com.google.mlkit.vision.face.*
import com.google.mlkit.vision.common.InputImage
import java.io.File

class FaceDetectorModule(
  reactContext: ReactApplicationContext
) : ReactContextBaseJavaModule(reactContext) {

  private val detector: FaceDetector

  init {
    val options = FaceDetectorOptions.Builder()
      .setPerformanceMode(FaceDetectorOptions.PERFORMANCE_MODE_FAST)
      .build()

    detector = FaceDetection.getClient(options)
  }

  override fun getName(): String {
    return "FaceDetectorModule"
  }

  @ReactMethod
  fun detectFaceFromPath(
    imagePath: String,
    promise: Promise
  ) {
    try {
      val file = File(imagePath)
      if (!file.exists()) {
        promise.resolve(0)
        return
      }

      val bitmap = BitmapFactory.decodeFile(imagePath)
      val image = InputImage.fromBitmap(bitmap, 0)

      detector.process(image)
        .addOnSuccessListener { faces ->
          // 🔥 return number of faces
          promise.resolve(faces.size)
        }
        .addOnFailureListener {
          promise.resolve(0)
        }

    } catch (e: Exception) {
      promise.resolve(0)
    }
  }
}
