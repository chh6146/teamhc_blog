import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import * as ExternalPlugin from "./.quartz/plugins"

// 날짜 역순 정렬을 구현하기 위해 Explorer 재정의
ExternalPlugin.Explorer({
  sortFn: (a, b) => {
    // 폴더를 파일보다 앞에
    if (a.isFolder && !b.isFolder) return -1
    if (!a.isFolder && b.isFolder) return 1

    // 둘 다 폴더인 경우: 알파벳순
    if (a.isFolder && b.isFolder) {
      return a.displayName.localeCompare(b.displayName, undefined, {
        numeric: true,
        sensitivity: "base",
      })
    }

    // 둘 다 파일인 경우: 날짜 역순 (최신순)
    const aDate = a.data?.date
    const bDate = b.data?.date
    if (aDate && bDate) return new Date(bDate).getTime() - new Date(aDate).getTime()
    if (aDate) return -1
    if (bDate) return 1

    // 날짜가 없는 경우 알파벳순으로 폴백
    return a.displayName.localeCompare(b.displayName, undefined, {
      numeric: true,
      sensitivity: "base",
    })
  },
})

const config = await loadQuartzConfig()
export default config
export const layout = await loadQuartzLayout()