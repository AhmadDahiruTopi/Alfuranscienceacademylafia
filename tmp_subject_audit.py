from pathlib import Path
source = Path('client/src/pages/Home.tsx').read_text()
out = []
for marker in ['function SectionTermlyReportView', 'function ResultsView']:
    start = source.index(marker)
    end = source.find('\nfunction ', start + len(marker))
    block = source[start:end if end != -1 else None]
    out.append(f'--- {marker} ---')
    for needle in ['sectionMatchesClass', 'classSubjectsQuery', 'resultsQuery', 'subjectsQuery', 'reportTemplate', 'primary-report-source', 'secondary-report-source', 'arabicName']:
        positions = []
        cursor = 0
        while True:
            pos = block.find(needle, cursor)
            if pos < 0: break
            positions.append(pos)
            cursor = pos + len(needle)
        for pos in positions[:4]:
            out.append(block[max(0, pos-180):pos+360].replace('\n',' '))
Path('/home/ubuntu/subject_audit.txt').write_text('\n'.join(out))
