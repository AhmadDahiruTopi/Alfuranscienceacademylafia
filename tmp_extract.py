from pathlib import Path
source = Path('client/src/pages/Home.tsx').read_text()
for marker in ['function SectionTermlyReportView', 'function ResultsView']:
    start = source.index(marker)
    end = source.find('\nfunction ', start + len(marker))
    if end < 0:
        end = len(source)
    block = source[start:end]
    print(f'--- {marker} ---')
    for needle in ['reportSection', 'sectionClasses', 'classSubjectsQuery', 'trpc.school.classes', 'trpc.school.classSubjects', 'scoreLimits', 'arabicName', 'selectedClassId']:
        pos = block.find(needle)
        if pos >= 0:
            print(block[max(0, pos - 240):pos + 520])
