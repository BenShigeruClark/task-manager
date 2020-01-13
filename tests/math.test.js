const { calculateTip } = require('../src/math')

test('Should calculate total with tip', () => {
    const total = calculateTip(10, .3)
    expect(total).toBe(13)
})

test('Should calculate total with default tip', () => {
    const total = calculateTip(10)
    expect(total).toBe(12.5)
})

// Why should you write test cases
// Saves time, creates reliable software, gives flexibility to developers for refactoring, collaboration, and profiling.
// Gives dev peace of mind that application works!


